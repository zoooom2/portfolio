/* eslint-disable node/no-unsupported-features/es-syntax */
// eslint-disable-next-line import/no-extraneous-dependencies
const Order = require('../models/orderModel');
const factory = require('./handlerFactory');

exports.orderPerTime = factory.getTotalModelPerTime(Order, [
  { field: 'Total Items Ordered', acc: '$total_items' },
  { field: 'Total Sale', acc: '$total_amount' },
]);

exports.percentageChangeOrder = factory.percentageChangeModel(Order, [
  { field: 'Total Items Ordered', acc: '$total_items' },
  { field: 'Total Sale', acc: '$total_amount' },
]);

exports.getMyOrders = factory.getMine(Order);
exports.getOrder = factory.getOne(Order);
exports.getAllOrders = factory.getAll(Order);
exports.updateOrder = factory.updateOne(Order);
exports.deleteOrder = factory.deleteOne(Order);
