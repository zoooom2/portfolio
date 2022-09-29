const Tweet = require('../models/tweetModel');

const {
  deleteOne,
  updateOne,
  getOne,
  getAll,
  createOne,
  docAction,
} = require('./handlerFactory');

exports.checkCircle = (req, res, next) => {};

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

exports.retweet = docAction(Tweet);
exports.likeTweet = docAction(Tweet);
exports.bookmarkTweet = docAction(Tweet);

exports.createTweet = createOne(Tweet);
exports.getAllTweets = getAll(Tweet);
exports.deleteTweet = deleteOne(Tweet);
exports.updateTweet = updateOne(Tweet);
exports.getTweet = getOne(Tweet);
