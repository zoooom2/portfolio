const mongoose = require('mongoose');

const { Schema, model } = mongoose;
const visitorCountSchema = new Schema({
  createdAt: { type: Date, required: true },
  count: { type: Number, required: true },
});
const VisitorCount = model('VisitorCount', visitorCountSchema);

module.exports = VisitorCount;
