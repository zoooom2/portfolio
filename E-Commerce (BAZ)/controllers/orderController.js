const paystack = require('paystack-api')(process.env.PAYSTACK_SECRET_KEY);
const Order = require('../models/orderModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');

// const createOrderCheckout = async (session) => {
//   // const product = session.client_reference_id;
//   // const user = (await User.findOne({ email: session.customer_email })).id;
//   // const price = session.display_items[0].amount / 100;
//   await Order.create({ product, user, price });
// };

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get the currently booked product
  const cart = req.body;

  const { name, email, id } = req.user;
  let totalPrice;
  let quantity;

  cart.forEach((item) => {
    item.price *= 100;
    totalPrice += item.price * item.quantity;
    quantity += item.quantity;
  });

  const helper = new paystack.FeeHelper();
  //2) Create checkout session
  const session = await paystack.transaction.initialize({
    name,
    email,
    // callback_url:
    amount: helper.addFeesTo(totalPrice),
    quantity,
  });

  const verification = await paystack.transaction.verify(session.reference);

  if (verification.data.status === 'success') {
    await Order.create({
      user: id,
      orderItems: cart,
      paymentInfo: { id: session.reference, status: verification.data.status },
      createdAt: verification.data.created_at,
      paidAt: verification.data.paid_at,
      totalPrice: totalPrice,
    });
  } else {
    next(new AppError('Transaction failed', 401));
  }

  // 3) Create session as response
  res.status(200).json({
    status: 'success',
    session,
  });
});

exports.createOrder = factory.createOne(Order);
exports.getOrder = factory.getOne(Order);
exports.getAllOrders = factory.getAll(Order);
exports.updateOrder = factory.updateOne(Order);
exports.deleteOrder = factory.deleteOne(Order);
