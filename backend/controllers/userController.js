const Tweet = require('../models/tweetModel');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { updateOne, getOne, getAll } = require('./handlerFactory');

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
  const filteredBody = filteredObj(
    req.body,
    'phoneNumber',
    'email',
    'username'
  );

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

    tweet = await Tweet.findById(tweetId);
    await tweet.deleteOne({ author: req.params.id });
  });

  await user.deleteOne({ id: req.params.id });
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

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

exports.blockUser = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const { id } = req.params;

  const doc = await User.findById(id);

  let condition = false;
  condition = doc.blocked.includes(userId);
  if (condition) {
    doc.blocked = doc.blocked.filter((user) => userId !== user.toString());
    req.user.blocked = req.user.blocked.filter(
      (user) => user.toString() !== id
    );
  } else {
    doc.blocked = doc.blocked.push(userId);
    req.user.blocked = req.user.blocked.push(id);
    doc.following = doc.following.filter(
      (following) => following.toString() !== userId
    );
    req.user.following = req.user.following.filter(
      (following) => following.toString() !== id
    );
    req.user.followers = req.user.following.filter(
      (followers) => followers.toString() !== id
    );
    doc.followers = doc.followers.filter(
      (followers) => followers.toString() !== userId
    );
  }
  await User.findByIdAndUpdate(req.user.id, {
    following: req.user.following,
    followers: req.user.followers,
    blocked: req.user.blocked,
  });

  await doc.save({ validateBeforeSave: false });

  res.status(201).json({
    status: 'success',
    doc,
  });
});

exports.addCircle = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const doc = await User.findById(id);
  let condition = false;
  condition = req.user.circles.includes(id);
  if (condition) {
    req.user.circles = req.user.circles.filter((x) => x.toString() !== id);
  } else {
    req.user.circles = req.user.circles.push(id);
  }
  await doc.save({ validateBeforeSave: false });

  if (condition) {
    res.status(201).json({
      status: 'success',
      doc,
    });
  } else {
    next();
  }
});

exports.getAllUsers = getAll(User);
exports.getUser = getOne(User);
exports.updateUser = updateOne(User);
