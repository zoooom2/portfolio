// eslint-disable-next-line import/no-extraneous-dependencies
const moment = require('moment');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

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
    console.log(req.body);
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',

      data: doc,
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',

      data: doc,
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',

      data: doc,
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // To allow for nested GET reviews on tour (hack)
    let filter = {};
    if (req.params.productId) filter = { product: req.params.productId };

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

      data: doc,
    });
  });

exports.getMine = (Model) =>
  catchAsync(async (req, res) => {
    const data = await Model.find({
      user: req.user.id,
    });
    res.status(200).json({ status: 'success', results: data.length, data });
  });

exports.getTotalModelPerTime = (Model, acc) =>
  catchAsync(async (req, res) => {
    const { time } = req.params;
    const period = {
      daily: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
      monthly: { $month: '$createdAt' },
      yearly: { $year: '$createdAt' },
    };

    const startOfWeek = moment().startOf('week');
    const endOfWeek = moment().endOf('week');
    const filter = {
      createdAt: {
        $gte: startOfWeek.toDate(),
        $lte: endOfWeek.toDate(),
      },
    };

    let match;
    if (time === 'weekly') {
      match = { $match: filter };
    } else {
      match = null;
    }

    const totalAmount = await Model.aggregate([
      // eslint-disable-next-line node/no-unsupported-features/es-syntax
      { ...match },
      {
        $group: {
          _id: period[time || 'daily'],
          totalOrders: { $sum: acc },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);
    res.status(200).json({ ordersPerTime: totalAmount });
  });

exports.percentageChangeOrder = (Model, acc) =>
  catchAsync(async (req, res) => {
    const { time } = req.params;
    const timeRange = {
      daily: 'day',
      weekly: 'week',
      monthly: 'month',
      yearly: 'year',
    };
    const currentTimeStart = moment().startOf(timeRange[time] || 'day');
    const currentTimeEnd = moment().endOf(timeRange[time] || 'day');
    const previousTimeStart = moment()
      .startOf(timeRange[time] || 'day')
      .subtract(1, timeRange[time] || 'day');
    const previousTimeEnd = moment()
      .endOf(timeRange[time] || 'day')
      .subtract(1, timeRange[time] || 'day');

    const currentTime = await Model.aggregate([
      {
        $match: {
          createdAt: {
            $gte: currentTimeStart.toDate(),
            $lte: currentTimeEnd.toDate(),
          },
        },
      },
      {
        $group: {
          _id: null,
          totalCurrentTime: { $sum: acc },
        },
      },
      {
        $project: {
          _id: 0,
          totalCurrentTime: 1,
        },
      },
    ]);
    const previousTime = await Model.aggregate([
      {
        $match: {
          createdAt: {
            $gte: previousTimeStart.toDate(),
            $lte: previousTimeEnd.toDate(),
          },
        },
      },
      {
        $group: {
          _id: null,
          totalPreviousTime: { $sum: acc },
        },
      },
      {
        $project: {
          _id: 0,
          totalPreviousTime: 1,
        },
      },
    ]);

    const totalCurrentTime = currentTime[0].totalCurrentWeek || 0;
    const totalPreviousTime = previousTime[0].totalPreviousTime || 0;
    const percentageDifference =
      ((totalCurrentTime - totalPreviousTime) / totalPreviousTime) * 100;

    res.status(200).json({
      time,
      totalCurrentTime,
      totalPreviousTime,
      percentageDifference,
    });
  });
