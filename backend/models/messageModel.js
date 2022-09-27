const mongoose = require('mongoose');
// const validator = require('validator');

const { Schema, model, ObjectId } = mongoose;

const messageSchema = new Schema(
  {
    author: {
      user: { type: ObjectId },
      required: [true, 'specify who is recieving message'],
    },
    reciever: [
      {
        user: { type: ObjectId },
        required: [true, 'specify who is recieving message'],
      },
    ],
    parcel: { type: String, required: [true, 'please enter your message'] },
    createdAt: { type: Date, default: Date.now() },
    unread: { type: Boolean, default: false },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Message = model('Message', messageSchema);

module.exports = Message;
