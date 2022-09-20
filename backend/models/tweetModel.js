const mongoose = require('mongoose');
// const validator = require('validator');

const { Schema, model, ObjectId } = mongoose;

const tweetSchema = new Schema(
  {
    author: {
      type: ObjectId,
      required: [true, 'please include the person sending tweet'],
    },
    tweetBody: {
      type: String,
      required: [true, 'please input something to send the tweet'],
    },
    timeStamp: { type: Date, default: Date.now() },
    comment: [{ user: { type: ObjectId }, parcel: String }],
    retweet: [ObjectId],
    likes: [ObjectId],
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Tweet = model('Tweet', tweetSchema);

module.exports = Tweet;
