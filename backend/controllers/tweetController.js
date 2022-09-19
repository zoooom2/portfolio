const Tweet = require('../models/tweetModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const {
  deleteOne,
  updateOne,
  getOne,
  getAll,
  createOne,
} = require('./handlerFactory');

exports.likeTweet = catchAsync(async (req, res, next) => {
  next();
});

exports.createTweet = createOne(Tweet);
exports.getAll = getAll(Tweet);
exports.deleteOne = deleteOne(Tweet);
exports.updateOne = updateOne(Tweet);
exports.getOne = getOne(Tweet);
