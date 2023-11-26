const mongoose = require('mongoose');

const { model, Schema } = mongoose;

const articleSchema = new Schema({
  title: { type: String, required: true },
  titleUl: { type: String },
  image: { type: String, required: true },
  overview: { type: String },
  content: [{ topic: String, description: String }],
  author: { type: String, required: true },
  dateCreated: { type: Date, required: true, default: Date.now() },
});

const Article = model('Article', articleSchema);

module.exports = Article;
