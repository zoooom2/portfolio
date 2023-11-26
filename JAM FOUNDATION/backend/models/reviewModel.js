// review / rating / createdAt / ref to tour / ref to user
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, 'Review can not be empty!'],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  organization: { type: String, required: [true, 'state the organization'] },
  image: { type: String, required: [true, 'add an image'] },
  name: { type: String, required: [true, 'state the name'] },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
