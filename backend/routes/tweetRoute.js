const express = require('express');
const {
  protect,
  accountPrivate,
} = require('../controllers/authorisationController');
const { checkOwner } = require('../controllers/handlerFactory');
const { sendNotification } = require('../controllers/notificationController');
const {
  createTweet,
  getAllTweets,
  getTweet,
  deleteTweet,
  updateTweet,
  bookmarkTweet,
  replyTweet,
  assignTweetData,
} = require('../controllers/tweetController');
const Tweet = require('../models/tweetModel');

const router = express.Router({ mergeParams: true });

router.use(protect);
router.route('/').post(assignTweetData, createTweet).get(getAllTweets);

// router
//   .route('/:action/:id')
//   .patch(bookmarkTweet)

router.patch('/bookmark/:id', bookmarkTweet);
router
  .route('/reply/:id')
  .post(assignTweetData, createTweet, replyTweet, sendNotification);

router
  .route('/:id')
  .get(accountPrivate, getTweet)
  .delete(checkOwner(Tweet), deleteTweet)
  .patch(checkOwner(Tweet), updateTweet);

module.exports = router;
