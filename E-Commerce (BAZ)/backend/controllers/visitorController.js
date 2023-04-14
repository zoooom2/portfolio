const VisitorCount = require('../models/visitorModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.createOrUpdateVisitorCount = catchAsync(async (req, res) => {
  const today = new Date().setHours(0, 0, 0, 0);
  let doc = await VisitorCount.findOne({ createdAt: today });

  if (doc) {
    doc.count += 1;
    await doc.save();
  } else {
    doc = await VisitorCount.create({ createdAt: today, count: 1 });
  }

  res.status(200).json({ doc });
});

exports.visitorPerTime = factory.getTotalModelPerTime(VisitorCount, '$count');
exports.pctChangeVisitor = factory.getTotalModelPerTime(VisitorCount, '$count');
