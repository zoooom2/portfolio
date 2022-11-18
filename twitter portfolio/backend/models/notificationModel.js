const mongoose = require('mongoose');

const { ObjectId, model, Schema } = mongoose;

const notificationSchema = new Schema({
  to: ObjectId,
  read: { type: Boolean, default: false },
  parentId: ObjectId,
  createdAt: { type: Date, default: Date.now() },
  expiresAt: { type: Date, expires: '1000d' },
  message: String,
});

const Notifications = model('Notifications', notificationSchema);

module.exports = Notifications;
