const Order = require('../models/orderModel');
const Review = require('../models/reviewModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.setProductUserIds = catchAsync(async (req, res, next) => {
  // Allow nested routes
  const order = await Order.find({ user: req.user.id });
  const check = order.map((cart) =>
    cart.orderItems.filter(
      (x) => x.product._id.toString() === req.params.productId
    )
  );
  console.log(check);
  if (check.some((x) => x.length > 0)) {
    if (!req.body.product) req.body.product = req.params.productId;
    if (!req.body.user) req.body.user = req.user.id;
    next();
  } else {
    next(
      new AppError(
        'only users who have bought this product can review this product',
        401
      )
    );
  }
});

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
