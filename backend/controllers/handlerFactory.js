// const Tweet = require('../models/tweetModel');
const Tweet = require('../models/tweetModel');
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
    if (Model === Tweet) req.body.author = req.user.id;
    const newDoc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        doc: newDoc,
      },
    });
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

    console.log(features);
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
    const doc = await Model.findById(id);

    if (!doc) next(new AppError('No doc with that id', 404));

    if (action === 'like') {
      if (doc.likes.includes(userId)) {
        doc.likes = doc.likes.filter((user) => userId === user);
      } else {
        doc.likes = doc.likes.push(userId);
      }
    } else if (action === 'retweet') {
      if (doc.retweet.includes(userId)) {
        doc.retweet = doc.retweet.filter((user) => userId === user);
      } else {
        doc.retweet = doc.retweet.push(userId);
      }
    } else if (action === 'comment') {
      doc.comment.push({ user: userId, parcel: req.body.comment });
    } else if (action === 'block') {
      if (doc.blocked.includes(userId)) {
        doc.blocked = doc.blocked.filter((user) => userId === user);
      } else {
        doc.blocked = doc.blocked.push(userId);
        doc.following = doc.following.filter(
          (following) => following === userId
        );
        doc.followers = doc.followers.filter(
          (followers) => followers === userId
        );
      }
    }
    await doc.save({ validateBeforeSave: false });

    res.status(201).json({
      status: 'success',
      doc,
    });
  });
