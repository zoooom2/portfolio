const paystack = require('paystack-api')(process.env.PAYSTACK_SECRET_KEY);
const crypto = require('crypto');
const Order = require('../models/orderModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { updateStock } = require('./productsController');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const { name, email } = req.user;
  const helper = new paystack.FeeHelper();

  //1) Initialize the transaction
  const session = await paystack.transaction.initialize({
    name,
    email,
    callback_url: `${process.env.CLIENT_URL}/order`,
    amount: helper.addFeesTo(req.body.totalPrice * 100),
  });
  res.status(200).json({ data: session.data.authorization_url });
});

const verifyPaystackTransaction = (reference) =>
  catchAsync(async (req, res, next) => {
    const verification = await paystack.transaction.verify({ reference });
    if (verification.data.status !== 'success') {
      next(new AppError('payment transaction verification failed', 401));
    }
    return verification;
  });

exports.createOrder = catchAsync(async (req, res, next) => {
  //2) Verify the transaction

  const verification = verifyPaystackTransaction(req.body.reference);

  const orderItems = req.body.cart;

  //3) create the order

  const order = await Order.create({
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    ...req.body,
    orderItems,
    paidAt: verification.data.paid_at,
    createdAt: verification.data.created_at,
    paymentInfo: {
      reference: verification.data.reference,
      channel: verification.data.channel,
      status: verification.data.status,
      gateway: 'PAYSTACK',
    },
    user: req.user.id,
  });

  if (!order) {
    next(new AppError('Could not create order. Please try again.', 400));
  }

  //4) update the stock of each product

  await Promise.all(
    orderItems.map(
      async (item) => await updateStock(item.product, item.quantity)
    )
  );

  // 5) Create session as response
  res.status(200).json({
    status: 'success',
    order,
  });
});

// exports.updatePayStackOrderStatus = (reference, status, id) =>
//   catchAsync(async (req, res) => {
//     const order = await Order.findByIdAndUpdate(
//       id,
//       { orderStatus: status },
//       {
//         new: true,
//         runValidators: true,
//       }
//     );
//     res.status(200).json({ status: 'success', order });
//   });

exports.updatePayStackOrder = catchAsync(async (req, res) => {
  const order = await Order.findById(req.params.id);
  const { status } = req.query;
  await verifyPaystackTransaction(order.paymentInfo.reference);
  const { orderStatus, deliveredAt } = req.body;
  req.body = { orderStatus, deliveredAt };

  if (status === 'completed') {
    order.status = 'completed';
    order.deliveredAt = Date.now();
  } else {
    order.orderStatus = status;
  }
  order.save({ new: true });
  res.status(200).json({ status: 'success', order });
});

exports.payStackWebHook = catchAsync(async (req, res) => {
  const hash = crypto
    .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
    .update(JSON.stringify(req.body))
    .digest('hex');
  if (hash === req.headers['x-paystack-signature']) {
    // Retrieve the request's body
    // const event = req.body;
    // console.log(event);
  }

  res.status(200).json({});
});

// exports.filterUpdateOrder = catchAsync(async (req, res, next) => {
//   const { orderStatus, deliveredAt } = req.body;
//   req.body = { orderStatus, deliveredAt };
//   next();
// });
