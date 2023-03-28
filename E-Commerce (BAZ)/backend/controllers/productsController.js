// eslint-disable-next-line import/no-extraneous-dependencies
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Product = require('../models/productsModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.updateStock = (id, quantity) =>
  catchAsync(async () => {
    const product = await Product.findById(id);
    product.stock -= quantity;
    product.save({ validateBeforeSave: false });
  });

exports.uploadProduct = catchAsync(async (req, res) => {
  const stripeProduct = await stripe.products.create({
    name: req.body.productName,
    active: true,
    description: req.body.description,
    images: req.body.images,
  });

  const stripePrice = await stripe.prices.create({
    unit_amount: req.body.price * 100,
    currency: 'ngn',
    product: stripeProduct.id,
  });
  // console.log(stripePrice);
  req.body.priceID = stripePrice.id;

  const response = await Product.create(req.body);

  res.status(201).json({ response });
});

exports.getAllProducts = factory.getAll(Product);
exports.getProduct = factory.getOne(Product);
// exports.uploadProduct = factory.createOne(Product);
exports.updateProduct = factory.updateOne(Product);
exports.deleteProduct = factory.deleteOne(Product);
