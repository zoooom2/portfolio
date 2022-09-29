const express = require('express');
const {
  protect,
  accountPrivate,
} = require('../controllers/authorisationController');
const { checkOwner } = require('../controllers/handlerFactory');
const { sendNotification } = require('../controllers/notificationController');
const {
  likeTweet,
  createTweet,
  getAllTweets,
  getTweet,
  deleteTweet,
  updateTweet,
  retweet,
  bookmarkTweet,
  replyTweet,
} = require('../controllers/tweetController');
const Tweet = require('../models/tweetModel');

const router = express.Router({ mergeParams: true });

router.use(protect);
router.route('/').post(createTweet).get(getAllTweets);

router
  .route('/:action/:id')
  .patch(bookmarkTweet)
  .post(createTweet, replyTweet, sendNotification);
router
  .route('/:id')
  .get(accountPrivate, getTweet)
  .delete(checkOwner(Tweet), deleteTweet)
  .patch(checkOwner(Tweet), updateTweet)
  .post(retweet, sendNotification)
  .post(likeTweet, sendNotification);

module.exports = router;
