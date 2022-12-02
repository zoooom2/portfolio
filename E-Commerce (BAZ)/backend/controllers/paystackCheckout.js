const paystack = require('paystack-api')(process.env.PAYSTACK_SECRET_KEY);
const crypto = require('crypto');
const Order = require('../models/orderModel');
const catchAsync = require('../utils/catchAsync');
const { updateStock } = require('./productsController');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const { name, email } = req.user;
  const helper = new paystack.FeeHelper();

  //1) Initialize the transaction
  const session = await paystack.transaction.initialize({
    name,
    email,
    callback_url: `${req.protocol}://${req.get(
      'host'
    )}/api/v1/orders/createOrder`,
    amount: helper.addFeesTo(req.body.totalPrice * 100),
  });
  // console.log(session.data.authorization_url);
  res.redirect(session.data.authorization_url);
});

exports.createOrder = catchAsync(async (req, res) => {
  //2) Verify the transaction
  const verification = await paystack.transaction.verify({
    reference: req.query.reference,
  });

  //3) create the order
  const order = await Order.create({
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    ...req.body,
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

  //4) if successful then update the stock of each product
  if (verification.data.status === 'success') {
    await Promise.all(
      req.body.orderItems.map(
        async (item) => await updateStock(item.product, item.quantity)
      )
    );
  }

  // 5) Create session as response
  res.status(200).json({
    status: 'success',
    order,
  });
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

exports.filterUpdateOrder = catchAsync(async (req, res, next) => {
  const { orderStatus, deliveredAt } = req.body;
  req.body = { orderStatus, deliveredAt };
  next();
});
