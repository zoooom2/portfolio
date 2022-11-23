const paystack = require('paystack-api')(process.env.PAYSTACK_SECRET_KEY);
const Order = require('../models/orderModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const { updateStock } = require('./productsController');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const { name, email, id } = req.user;
  const helper = new paystack.FeeHelper();

  //1) Initialize the transaction
  const session = await paystack.transaction.initialize({
    name,
    email,
    // callback_url:
    amount: helper.addFeesTo(req.body.totalPrice * 100),
  });

  console.log(session);

  //2) Verify the transaction
  const verification = await paystack.transaction.verify({
    reference: session.data.reference,
  });

  //3) create the order
  const order = await Order.create({
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    ...req.body,
    paidAt: verification.data.paid_at,
    createdAt: verification.data.created_at,
    paymentInfo: {
      id: verification.data.reference,
      channel: verification.data.channel,
      status: verification.data.status,
    },
    user: id,
  });

  //4) if successful then update the stock of each product
  if (verification.data.status === 'success') {
    await Promise.all(
      req.body.orderItems.forEach((item) =>
        updateStock(item.product, item.quantity)
      )
    );
  }

  // 5) Create session as response
  res.status(200).json({
    status: 'success',
    order,
  });
});

exports.filterUpdateOrder = catchAsync(async (req, res, next) => {
  const { orderStatus, deliveredAt } = req.body;
  req.body = { orderStatus, deliveredAt };
  next();
});

exports.createOrder = factory.createOne(Order);
exports.getOrder = factory.getOne(Order);
exports.getAllOrders = factory.getAll(Order);
exports.updateOrder = factory.updateOne(Order);
exports.deleteOrder = factory.deleteOne(Order);
