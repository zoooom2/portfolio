const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });
const {
  getAllReviews,
  setProductUserIds,
  createReview,
  getReview,
  updateReview,
  deleteReview,
} = reviewController;
const { protect, restrictTo } = authController;

router.use(protect);

router
  .route('/')
  .get(getAllReviews)
  .post(restrictTo('user'), setProductUserIds, createReview);

router
  .route('/:id')
  .get(getReview)
  .patch(restrictTo('user', 'admin'), updateReview)
  .delete(restrictTo('user', 'admin'), deleteReview);

module.exports = router;
