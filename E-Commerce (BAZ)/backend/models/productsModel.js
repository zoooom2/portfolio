const mongoose = require('mongoose');

const { ObjectId, model, Schema } = mongoose;

const productSchema = new Schema({
  productName: { type: String, required: true },
  description: { type: String, required: true },
  collectionName: { type: String, required: true },
  releaseDate: { type: Date, default: Date.now() },
  price: { type: Number, required: true },
  taxPrice: { type: Number, required: true, default: 0 },
  color: { type: String, required: true },
  discount: { type: Number, required: true, default: 0, min: 0, max: 100 },
  category: { type: String, required: true },
  reviews: [ObjectId],
  images: [{ type: String, required: true }],
  numberofReviews: Number,
  stock: { type: Number, required: true },
  ratingsAverage: {
    type: Number,
    default: 5,
  },
});
const Product = model('Product', productSchema);

module.exports = Product;
