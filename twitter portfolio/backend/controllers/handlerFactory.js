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

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

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

exports.createOne = (Model, middleware) =>
  catchAsync(async (req, res, next) => {
    // console.log(req.files);
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    if (req.options) req.body = { ...req.body, ...req.options };
    // console.log(req.body);

    const newDoc = await Model.create(req.body);
    req.doc = newDoc;

    if (!middleware) {
      res.status(201).json({
        status: 'success',
        data: {
          doc: newDoc,
        },
      });
    } else {
      next();
    }
  });

exports.getOne = (Model, middleware, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = await Model.findById(req.params.id);

    if (popOptions) query = query.populate(popOptions);

    const doc = await query;

    if (!doc) {
      return next(new AppError('No doc found with that ID', 404));
    }
    if (middleware) {
      next();
    } else {
      res.status(200).json({
        status: 'success',
        data: {
          doc,
        },
      });
    }
  });

exports.getAll = (Model, middleware) =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    if (req.filter) filter = { ...req.filter };
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    if (req.params.userId) filter = { ...filter, author: req.params.userId };

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    // console.log(features);
    // const doc = await features.query.explain();
    const doc = await features.query;
    req.doc = doc;
    // SEND RESPONSE
    if (middleware) {
      next();
    } else {
      res.status(200).json({
        status: 'success',
        results: doc.length,
        data: {
          doc,
        },
      });
    }
  });

exports.checkOwner = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = Model.findById(req.params.id);

    if (req.user.role === 'admin' || doc.author === req.user.id) {
      next();
    } else {
      next(new AppError('You perform this action on another person doc'));
    }
  });

exports.markAsRead = (Model) =>
  catchAsync(async (req, res, next) => {
    await Model.findByIdAndUpdate(req.params.id, { read: true });

    res.status(200).json({
      status: 'document read successfully',
    });
  });
