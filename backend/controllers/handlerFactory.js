const Tweet = require('../models/tweetModel');
const User = require('../models/userModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError('No doc found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    if (Model === Tweet) {
      req.body.author = req.user.id;
      if (req.params.action) {
        req.body.parentTweet = req.params.id;
      }
    }

    const newDoc = await Model.create(req.body);
    req.doc = newDoc;

    // // test
    // req.doc = req.body;

    if (req.params.action === 'reply') {
      next();
    } else {
      res.status(201).json({
        status: 'success',
        data: {
          doc: newDoc,
        },
      });
    }
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = await Model.findById(req.params.id);

    if (popOptions) query = query.populate(popOptions);

    const doc = await query;
    // doc.findOne({ _id: req.params.id })

    if (!doc) {
      return next(new AppError('No doc found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        doc,
      },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.userId) filter = { author: req.params.userId };

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    // console.log(features);
    // const doc = await features.query.explain();
    const doc = await features.query;
    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        doc,
      },
    });
  });

exports.docAction = (Model) =>
  catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const { action, id } = req.params;
    // console.log([1, 2, 3, 4, 5].filter((x) => x % 2 === 0));
    const doc = await Model.findById(id);

    if (!doc) next(new AppError('No doc with that id', 404));

    if (action === 'like') {
      if (doc.likes.includes(userId)) {
        doc.likes = doc.likes.filter((user) => userId !== user.toString());
      } else {
        doc.likes = doc.likes.push(userId);
      }
      //
      //
      //
      //
    } else if (action === 'retweet') {
      if (doc.retweet.includes(userId)) {
        doc.retweet = doc.retweet.filter((user) => userId !== user.toString());
      } else {
        doc.retweet = doc.retweet.push(userId);
      }
      //
      //
      //
      //
      //
      //
      //
    } else if (action === 'block') {
      if (doc.blocked.includes(userId)) {
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
      //
      //
      //
    } else if (action === 'bookmark') {
      if (req.user.bookmarks.includes(id)) {
        req.user.bookmarks = req.user.bookmarks.filter(
          (tweet) => tweet.toString() !== id
        );
      } else {
        req.user.bookmarks = req.user.bookmarks.push(id);
      }
      await User.findByIdAndUpdate(req.user.id, {
        bookmarks: req.user.bookmarks,
      });
      //
      //
      //
    } else if (action === 'circle') {
      if (req.user.circles.includes(id)) {
        req.user.circles = req.user.circles.filter((x) => x.toString() !== id);
      } else {
        req.user.circles = req.user.circles.push(id);
      }
    }

    await doc.save({ validateBeforeSave: false });

    // res.status(201).json({
    //   status: 'success',
    //   doc,
    // });
    next();
  });

exports.checkOwner = (Model) => (req, res, next) => {
  const doc = Model.findById(req.params.id);
  if (req.user.role === 'admin') next();
  if (doc.author === req.user.id) next();
  next(new AppError('You perform this action on another person doc'));
};
