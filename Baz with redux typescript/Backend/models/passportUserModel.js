const { Schema, model } = require('mongoose');

const googleUserSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  photo: { type: String },
  role: { type: String, enum: ['user'], default: 'user' },
  createdAt: { type: Date, default: Date.now },
});

const GoogleUser = model('GoogleUser', googleUserSchema);
module.exports = GoogleUser;
