const express = require('express');
const {
  protect,
  accountPrivate,
} = require('../controllers/authorisationController');
const { checkOwner, createOne } = require('../controllers/handlerFactory');
const {
  multipleSinglePhotos,

  resizeMultiplePhotos,
} = require('../controllers/imageHandler');
const { sendNotification } = require('../controllers/notificationController');
const {
  getAllTweets,
  getTweet,
  deleteTweet,
  updateTweet,
  bookmarkTweet,
  replyTweet,
  assignTweetData,
  filterTweets,
} = require('../controllers/tweetController');
const Tweet = require('../models/tweetModel');

const router = express.Router({ mergeParams: true });

router.use(protect);
router
  .route('/')
  .post(
    assignTweetData,
    multipleSinglePhotos({ name: 'images', maxCount: 4 }),
    resizeMultiplePhotos(2000, 1333, 'tweet', 'tweets'),
    createOne(Tweet)
  )
  .get(getAllTweets, filterTweets);
router.patch('/bookmark/:id', bookmarkTweet);
router
  .route('/reply/:id')
  .post(assignTweetData, createOne(Tweet, true), replyTweet, sendNotification);

router
  .route('/:id')
  .get(accountPrivate, getTweet)
  .delete(checkOwner(Tweet), deleteTweet)
  .patch(checkOwner(Tweet), updateTweet);

module.exports = router;
