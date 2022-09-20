const express = require('express');
const {
  likeTweet,
  createTweet,
  getAllTweets,
  getTweet,
  deleteTweet,
  updateTweet,
} = require('../controllers/tweetController');

const router = express.Router({ mergeParams: true });

// router.post('/likeTweet/:tweetId', likeTweet);
router.route('/').post(createTweet).get(getAllTweets);
router.route('/:id').get(getTweet).delete(deleteTweet).patch(updateTweet);
router.post('/:tweetId', likeTweet);

module.exports = router;
