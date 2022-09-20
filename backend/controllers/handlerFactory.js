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
    if (req.params.userId) filter = { tour: req.params.userId };

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

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

exports.docAction = () =>
  catchAsync(async (req, res, next) => {
    const { action, id, userId } = req.params;
    const tweet = await Tweet.findById(id);

    if (!tweet) next(new AppError('No tweet with that id', 404));

    if (action === 'like') {
      if (tweet.likes.includes(userId)) {
        tweet.likes = tweet.likes.filter((user) => userId === user);
      } else {
        tweet.likes = tweet.likes.push(userId);
      }
    } else if (action === 'retweet') {
      if (tweet.retweet.includes(userId)) {
        tweet.retweet = tweet.retweet.filter((user) => userId === user);
      } else {
        tweet.retweet = tweet.retweet.push(userId);
      }
    } else if (action === 'comment') {
      tweet.comment.push({ user: userId, parcel: req.body.comment });
    }
    await tweet.save({ validateBeforeSave: false });

    res.status(201).json({
      status: 'success',
      tweet,
    });
  });
