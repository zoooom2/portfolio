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
  category: {
    type: String,
    required: true,
    enum: [
      'bags',
      'bracelets',
      'waistbeads',
      'necklaces',
      'anklet',
      'earrings',
      'body jewelry',
      'custom',
    ],
  },
  reviews: [ObjectId],
  images: [{ type: String, required: true }],
  numberofReviews: Number,
  // stock: { type: Number, required: true },
  ratingsAverage: {
    type: Number,
    default: 5,
  },
});
const Product = model('Product', productSchema);

module.exports = Product;
