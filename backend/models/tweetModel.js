const mongoose = require('mongoose');
// const validator = require('validator');

const { Schema, model, ObjectId } = mongoose;

const tweetSchema = new Schema(
  {
    author: {
      type: ObjectId,
      required: [true, 'please include the person sending tweet'],
    },
    parentTweet: ObjectId,
    tweetBody: {
      type: String,
      required: [true, 'please input something to send the tweet'],
    },
    images: [String],
    timeStamp: { type: Date, default: Date.now() },
    comment: [ObjectId],
    retweet: [ObjectId],
    likes: [ObjectId],
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Tweet = model('Tweet', tweetSchema);

module.exports = Tweet;
