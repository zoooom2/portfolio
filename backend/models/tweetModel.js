const mongoose = require('mongoose');
// const validator = require('validator');

const { Schema, model, ObjectId } = mongoose;

const tweetSchema = new Schema(
  {
    author: { user: { type: ObjectId } },
    timeStamp: { type: Date, default: Date.now() },
    comment: [{ user: { type: ObjectId }, comment: String }],
    retweet: [{ user: { type: ObjectId } }],
    likes: [{ user: { type: ObjectId } }],
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Tweet = model('Tweet', tweetSchema);

module.exports = Tweet;
