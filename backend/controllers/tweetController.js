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
  //   const tweet = await Tweet.findByIdAndUpdate(req.params.id, {
  //     likes: [...req.user.likes],
  //   });

  const tweet = await Tweet.findById(req.params.tweetId);

  if (!tweet) next(new AppError('No tweet with that id', 404));

  if (tweet.likes.includes(req.params.userId)) {
    tweet.likes = tweet.likes.filter((user) => req.params.userId === user);
  } else {
    tweet.likes = tweet.likes.push(req.params.userId);
  }

  await tweet.save({ validateBeforeSave: false });

  console.log(tweet.likes);
  res.status(201).json({
    status: 'success',
    tweet,
  });

  //   next();
});

exports.createTweet = createOne(Tweet);
exports.getAllTweets = getAll(Tweet);
exports.deleteTweet = deleteOne(Tweet);
exports.updateTweet = updateOne(Tweet);
exports.getTweet = getOne(Tweet);
