const Product = require('../models/productsModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.updateStock = catchAsync(async (id, quantity) => {
  const product = await Product.findById(id);
  product.stock -= quantity;
  product.save({ validateBeforeSave: false });
});

exports.getAllProducts = factory.getAll(Product);
exports.getProduct = factory.getOne(Product);
exports.uploadProduct = factory.createOne(Product);
exports.updateProduct = factory.updateOne(Product);
exports.deleteProduct = factory.deleteOne(Product);
