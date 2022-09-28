const express = require('express');
const {
  protect,
  accountPrivate,
} = require('../controllers/authorisationController');
const { checkOwner } = require('../controllers/handlerFactory');
const {
  likeTweet,
  createTweet,
  getAllTweets,
  getTweet,
  deleteTweet,
  updateTweet,
  retweet,
  comment,
  bookmarkTweet,
} = require('../controllers/tweetController');
const Tweet = require('../models/tweetModel');

const router = express.Router({ mergeParams: true });

router.use(protect);
router.route('/').post(createTweet).get(getAllTweets);
router.route('/:action/:id').patch(bookmarkTweet);
router
  .route('/:id')
  .get(accountPrivate, getTweet)
  .delete(checkOwner(Tweet), deleteTweet)
  .patch(checkOwner(Tweet), updateTweet)
  .post(retweet)
  .post(likeTweet)
  .post(comment);

module.exports = router;
