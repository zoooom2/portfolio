const Order = require('../models/orderModel');
const factory = require('./handlerFactory');

exports.getMyOrders = factory.getMine(Order);
exports.getOrder = factory.getOne(Order);
exports.getAllOrders = factory.getAll(Order);
exports.updateOrder = factory.updateOne(Order);
exports.deleteOrder = factory.deleteOne(Order);
