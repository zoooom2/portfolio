const express = require('express');
const { protect } = require('../controllers/authorisationController');
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

router.use(protect);
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
