/* eslint-disable node/no-unsupported-features/es-syntax */
// eslint-disable-next-line import/no-extraneous-dependencies
const Order = require('../models/orderModel');
const factory = require('./handlerFactory');

exports.revenuePerTime = factory.getTotalModelPerTime(Order, '$totalPrice');
exports.percentageChange = factory.percentageChangeOrder(Order, '$totalPrice');
exports.getMyOrders = factory.getMine(Order);
exports.getOrder = factory.getOne(Order);
exports.getAllOrders = factory.getAll(Order);
exports.updateOrder = factory.updateOne(Order);
exports.deleteOrder = factory.deleteOne(Order);
