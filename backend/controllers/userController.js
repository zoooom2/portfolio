const Tweet = require('../models/tweetModel');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const {
  // deleteOne,
  updateOne,
  getOne,
  getAll,
  docAction,
} = require('./handlerFactory');

const filteredObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.checkBlock = (req, res, next) => {
  console.log(req.params.id);
  if (!req.user.blocked.includes(req.params.id)) {
    next();
  } else {
    next(new AppError("You've been blocked by this contact", 401));
  }
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // create error if user password data
  if (req.body.password || req.body.passwordConfirm) {
    next(
      new AppError(
        `You cant update your password via this route. Please use ${req.baseUrl}/updatePassword`,
        400
      )
    );
  }

  //update user document
  const filteredBody = filteredObj(req.body, 'name', 'email', 'username');
  if (req.file) filteredBody.photo = req.file.filename;

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  let tweet = null;
  await user.tweets.forEach(async (userTweet) => {
    const tweetId = userTweet.id.toString();
    console.log(tweetId);
    tweet = await Tweet.findById(tweetId);
    await tweet.deleteOne({ author: req.params.id });
  });

  await user.deleteOne({ id: req.params.id });
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not defined! Please use signup instead.',
  });
};

exports.follow = catchAsync(async (req, res, next) => {
  const user1 = await User.findById(req.params.id);
  const user2 = await User.findById(req.user.id);

  if (!user1 || !user2) next(new AppError('User not found', 404));

  if (req.params.id === req.user.id)
    next(new AppError('you cant follow yourself', 404));

  if (
    !user2.following.includes(req.params.id) &&
    !user1.followers.includes(req.user.id)
  ) {
    user2.following = user2.following.push(req.params.id);
    user1.followers = user1.followers.push(req.user.id);
  } else {
    user2.following = user2.following.filter(
      (x) => x.toString() !== req.params.id
    );
    user1.followers = user1.followers.filter(
      (x) => x.toString() !== req.user.id
    );
  }

  await user2.save({ validateBeforeSave: false });
  await user1.save({ validateBeforeSave: false });

  res.status(200).json({
    status: 'success',
    data: user2,
  });
});

// exports.addCircle = (req, res, next) => {
//   next();
// };

exports.blockUser = docAction(User);
exports.addCircle = docAction(User);
exports.getAllUsers = getAll(User);
exports.getUser = getOne(User);
exports.updateUser = updateOne(User);
// exports.deleteUser = deleteOne(User);
