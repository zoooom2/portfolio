const mongoose = require('mongoose');

const { model, Schema } = mongoose;

const productSchema = new Schema({
  productName: { type: String, required: true },
  collectionName: { type: String, required: true },
  releaseDate: { type: Date, default: Date.now() },
  price: { type: Number, required: true },
  color: { type: String, required: true },
  category: { type: String, required: true },
});
const Product = model('Product', productSchema);

module.exports = Product;
