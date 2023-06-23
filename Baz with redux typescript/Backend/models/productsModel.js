const mongoose = require('mongoose');

const { ObjectId, model, Schema } = mongoose;

const productSchema = new Schema({
  productName: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  // USDPrice: { type: Number, required: true },
  priceID: { type: String, required: true },
  taxPrice: { type: Number, required: true, default: 0 },
  discount: { type: Number, required: true, default: 0, min: 0, max: 100 },
  color: [{ type: String, required: true }],
  category: {
    type: String,
    required: true,
  },
  reviews: [ObjectId],
  images: [{ type: String, required: true }],
  numberofReviews: { type: Number, required: true, default: 0 },
  stock: { type: Number, required: true },
  ratingsAverage: {
    type: Number,
    default: 5,
  },
  sizes: {
    type: [
      {
        size: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    required: true,
  },
  quantitySold: { type: Number, required: true, default: 0 },
  collectionName: { type: String, required: true },
  releaseDate: { type: Date, required: true, default: Date.now },
});
const Product = model('Product', productSchema);

module.exports = Product;
