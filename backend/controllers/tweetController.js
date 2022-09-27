const Tweet = require('../models/tweetModel');

const {
  deleteOne,
  updateOne,
  getOne,
  getAll,
  createOne,
  docAction,
} = require('./handlerFactory');

exports.comment = docAction(Tweet);
exports.retweet = docAction(Tweet);
exports.likeTweet = docAction(Tweet);
exports.createTweet = createOne(Tweet);
exports.getAllTweets = getAll(Tweet);
exports.deleteTweet = deleteOne(Tweet);
exports.updateTweet = updateOne(Tweet);
exports.getTweet = getOne(Tweet);
