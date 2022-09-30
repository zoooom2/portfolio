const Tweet = require('../models/tweetModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

const {
  deleteOne,
  updateOne,
  getOne,
  getAll,
  createOne,
} = require('./handlerFactory');

exports.checkCircle = (req, res, next) => {};

exports.assignTweetData = catchAsync(async (req, res, next) => {
  req.body.author = req.user.id;
  if (req.path.match(/^(\/reply\/)/)) {
    req.body.parentTweet = req.params.id;
  }

  next();
});

exports.replyTweet = async (req, res, next) => {
  await Tweet.findByIdAndUpdate(
    req.params.id,
    {
      $push: { comment: req.doc.id },
    },
    { new: true }
  );

  next();
};

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

exports.createTweet = createOne(Tweet);
exports.getAllTweets = getAll(Tweet);
exports.deleteTweet = deleteOne(Tweet);
exports.updateTweet = updateOne(Tweet);
exports.getTweet = getOne(Tweet);
