const mongoose = require('mongoose');

const { ObjectId, model, Schema } = mongoose;

const productSchema = new Schema({
  productName: { type: String, required: true },
  collectionName: { type: String, required: true },
  releaseDate: { type: Date, default: Date.now() },
  price: { type: Number, required: true },
  color: { type: String, required: true },
  category: { type: String, required: true },
  reviews: [ObjectId],
  ratingsAverage: {
    type: Number,
    default: 5,
  },
});
const Product = model('Product', productSchema);

module.exports = Product;
