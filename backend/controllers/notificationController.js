const Notifications = require('../models/notificationModel');
const Tweet = require('../models/tweetModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const { markAsRead } = require('./handlerFactory');

exports.sendNotification = catchAsync(async (req, res, next) => {
  const { action, id } = req.params;
  let message = null;
  let user = null;

  if (
    req.path.match(/^(\/retweet\/)/) ||
    req.path.match(/^(\/like\/)/) ||
    req.path.match(/^(\/reply\/)/)
  ) {
    const tweet = await Tweet.findById(id);

    user = await User.findById(tweet.author.toString());

    if (req.path.match(/^(\/reply\/)/)) {
      message = `${req.user.username} replied to your tweet`;
    } else if (req.path.match(/^(\/retweet\/)/)) {
      message = `${req.user.username} retweeted your tweet`;
    } else if (req.path.match(/^(\/like\/)/)) {
      message = `${req.user.username} liked your tweet`;
    }
  } else if (req.path.match(/^(\/follow\/)/) || action === 'message') {
    if (req.path.match(/^(\/follow\/)/)) {
      user = await User.findById(id);
      message = `${req.user.username} just followed you`;
    } else if (action === 'message') {
      user = req.rcpt;
      message = `${req.user.username} just sent you a message`;
    }
  }

  const body = {
    to: user.id.toString(),
    parentId: req.user.id,
    message: message,
  };

  await Notifications.create(body);

  res.status(200).json({
    status: 'success',
    data: req.user,
    userTwo: user,
  });
});

exports.setNotificationFilter = catchAsync(async (req, res, next) => {
  req.filter = { to: req.user.id };
  next();
});

exports.readNotification = markAsRead(Notifications, true);
