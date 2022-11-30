// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// const User = require('../models/userModel');
// const Order = require('../models/orderModel');
// const catchAsync = require('../utils/catchAsync');
// const factory = require('./handlerFactory');

// exports.getCheckoutSession = catchAsync(async (req, res, next) => {
//   // 2) Create checkout session
//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ['card'],
//     success_url: `${req.protocol}://${req.get(
//       'host'
//     )}/api/v1/orders/stripe-payment`,
//     cancel_url: `${req.protocol}://${req.get('host')}/api/v1/orders`,
//     customer_email: req.user.email,
//     line_items: req.body.orderItems,
//   });

//   // 3) Create session as response
//   res.status(200).json({
//     status: 'success',
//     session,
//   });
// });

// const createOrderCheckout = async (session) => {
//   await Order.create({ ...req.body });
// };

// exports.webhookCheckout = (req, res, next) => {
//   const signature = req.headers['stripe-signature'];

//   let event;
//   try {
//     event = stripe.webhooks.constructEvent(
//       req.body,
//       signature,
//       process.env.STRIPE_WEBHOOK_SECRET
//     );
//   } catch (err) {
//     return res.status(400).send(`Webhook error: ${err.message}`);
//   }

//   if (event.type === 'checkout.session.completed')
//     createOrderCheckout(event.data.object);

//   res.status(200).json({ received: true });
// };

// exports.createBooking = factory.createOne(Order);
// exports.getBooking = factory.getOne(Order);
// exports.getAllBookings = factory.getAll(Order);
// exports.updateBooking = factory.updateOne(Order);
// exports.deleteBooking = factory.deleteOne(Order);
