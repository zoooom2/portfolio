const express = require('express');
const {
  likeTweet,
  createTweet,
  getAllTweets,
  getTweet,
  deleteTweet,
  updateTweet,
  retweet,
  comment,
} = require('../controllers/tweetController');

const router = express.Router({ mergeParams: true });

// router.post('/likeTweet/:tweetId', likeTweet);
router.route('/').post(createTweet).get(getAllTweets);
router
  .route('/:id')
  .get(getTweet)
  .delete(deleteTweet)
  .patch(updateTweet)
  .post(retweet)
  .post(likeTweet)
  .post(comment);

module.exports = router;
