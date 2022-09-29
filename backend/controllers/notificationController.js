const Notifications = require('../models/notificationModel');
const Tweet = require('../models/tweetModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.sendNotification = catchAsync(async (req, res, next) => {
  const { action, id } = req.params;
  let message = null;
  let user = null;
  if (action === 'retweet' || action === 'like' || action === 'reply') {
    const tweet = await Tweet.findById(id);
    user = await User.findById(tweet.author);
    if (action === 'reply') {
      message = `${req.user.username} replied to your tweet`;
    } else if (action === 'retweet') {
      message = `${req.user.username} retweeted your tweet`;
    } else if (action === 'like') {
      message = `${req.user.username} liked your tweet`;
    }
  } else if (action === 'follow' || action === 'message') {
    if (action === 'follow') {
      user = await User.findById(id);
      message = `${req.user.username} just followed you`;
    }
  }

  const body = {
    to: user.id.toString(),
    parentId: req.user.id,
    message: message,
  };

  const doc = await Notifications.create(body);
  console.log(doc);

  res.status(200).json({
    status: 'success',
    data: req.user,
    userTwo: user,
  });
});
