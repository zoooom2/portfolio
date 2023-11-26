const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authControllers');

const router = express.Router({ mergeParams: true });
const {
  getAllReviews,

  createReview,
  getReview,
  updateReview,
  deleteReview,
} = reviewController;
const { protect, restrictTo } = authController;

router.route('/').get(getAllReviews);

router.use(protect);

router.post('/').post(createReview);

router
  .route('/:id')
  .get(getReview)
  .patch(restrictTo('user', 'admin'), updateReview)
  .delete(restrictTo('user', 'admin'), deleteReview);

module.exports = router;
