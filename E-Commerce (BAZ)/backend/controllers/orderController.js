/* eslint-disable node/no-unsupported-features/es-syntax */
// eslint-disable-next-line import/no-extraneous-dependencies
const Order = require('../models/orderModel');
const factory = require('./handlerFactory');

exports.orderPerTime = factory.getTotalModelPerTime(
  Order,
  '$orderItems.amount'
);

exports.revenuePerTime = factory.getTotalModelPerTime(Order, '$totalPrice');
exports.percentageChangeRevenue = factory.percentageChangeModel(
  Order,
  '$totalPrice'
);
exports.percentageChangeItemSold = factory.percentageChangeModel(
  Order,
  '$orderItems.amount'
);
exports.getMyOrders = factory.getMine(Order);
exports.getOrder = factory.getOne(Order);
exports.getAllOrders = factory.getAll(Order);
exports.updateOrder = factory.updateOne(Order);
exports.deleteOrder = factory.deleteOne(Order);
