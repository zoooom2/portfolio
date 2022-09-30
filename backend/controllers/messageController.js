const Message = require('../models/messageModel');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { deleteOne, updateOne, markAsRead } = require('./handlerFactory');

exports.createMessage = catchAsync(async (req, res, next) => {
  req.params.action = 'message';
  const recipient = await User.findById(req.params.id);
  req.rcpt = recipient;

  if (req.params.id === req.user.id.toString()) {
    next(new AppError('you cant message yourself', 400));
  } else if (recipient) {
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    const msg = { author: req.user.id, reciever: req.params.id, ...req.body };
    await Message.create(msg);
    next();
  } else {
    next(new AppError('invalid recipient id', 404));
  }
});

exports.setMessageFilter = catchAsync(async (req, res, next) => {
  req.filter = { reciever: req.user.id };
  next();
});

exports.deleteMessage = deleteOne(Message);
exports.updateMessage = updateOne(Message);
exports.readMessage = markAsRead(Message);
