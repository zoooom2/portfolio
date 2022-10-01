const Tweet = require('../models/tweetModel');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const { deleteOne, updateOne, getOne, getAll } = require('./handlerFactory');

exports.checkCircle = (req, res, next) => {};

exports.assignTweetData = catchAsync(async (req, res, next) => {
  req.body.author = req.user.id;
  if (req.path.match(/^(\/reply\/)/)) {
    req.body.parentTweet = req.params.id;
  }

  const doc = await Tweet.findById(req.params.id);
  if (doc) {
    next();
  } else {
    next(new AppError('doc not found', 404));
  }
});

exports.replyTweet = catchAsync(async (req, res, next) => {
  await Tweet.findByIdAndUpdate(
    req.params.id,
    {
      $push: { comment: req.doc.id },
    },
    { new: true }
  );

  next();
});

exports.retweet = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const { id } = req.params;
  const doc = await Tweet.findById(id);

  let condition = false;
  condition = doc.retweet.includes(userId);
  if (condition) {
    doc.retweet = doc.retweet.filter((user) => userId !== user.toString());
  } else {
    doc.retweet = doc.retweet.push(userId);
  }
  await doc.save({ validateBeforeSave: false });

  if (condition) {
    res.status(201).json({
      status: 'success',
      doc,
    });
  } else {
    next();
  }
});

exports.likeTweet = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const { id } = req.params;
  const doc = await Tweet.findById(id);

  let condition = false;
  condition = doc.likes.includes(userId);
  if (condition) {
    doc.likes = doc.likes.filter((user) => userId !== user.toString());
  } else {
    doc.likes = doc.likes.push(userId);
  }

  await doc.save({ validateBeforeSave: false });

  if (condition) {
    res.status(201).json({
      status: 'success',
      doc,
    });
  } else {
    next();
  }
});

exports.bookmarkTweet = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  let condition = false;
  condition = req.user.bookmarks.includes(id);
  if (condition) {
    req.user.bookmarks = req.user.bookmarks.filter(
      (tweet) => tweet.toString() !== id
    );
  } else {
    req.user.bookmarks = req.user.bookmarks.push(id);
  }
  await User.findByIdAndUpdate(req.user.id, {
    bookmarks: req.user.bookmarks,
  });

  res.status(201).json({
    status: 'success',
    doc: req.user,
  });
});

exports.filterTweets = catchAsync(async (req, res) => {
  const doc = req.doc.filter(
    (tweet) =>
      req.user.following.includes(tweet.author) ||
      tweet.author.toString() === req.user.id
  );
  res.status(200).json({
    status: 'success',
    length: doc.length,
    doc,
  });
});

exports.getAllTweets = getAll(Tweet, true);
exports.deleteTweet = deleteOne(Tweet);
exports.updateTweet = updateOne(Tweet);
exports.getTweet = getOne(Tweet);
