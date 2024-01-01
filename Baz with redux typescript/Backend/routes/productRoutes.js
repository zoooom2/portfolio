const express = require('express');
const productController = require('../controllers/productsController');
const authController = require('../controllers/authControllers');
const {
  setProductUserIds,
  createReview,
  getAllReviews,
} = require('../controllers/reviewController');
const {
  multipleSinglePhotos,
  processMultipleImages,
} = require('../controllers/imageHandler');

const router = express.Router();
const {
  getAllProducts,
  getProduct,
  updateProduct,
  uploadProduct,
  deleteProduct,
} = productController;

const { restrictTo, protect } = authController;

router.route('/').get(getAllProducts);
router.route('/:id').get(getProduct);

router.use(protect);

router
  .route('/:productId/reviews')
  .post(setProductUserIds, createReview)
  .get(setProductUserIds, getAllReviews);

router.use(restrictTo('admin'));

router
  .route('/')
  .post(
    multipleSinglePhotos([{ name: 'images', maxCount: 4 }], 'product'),
    uploadProduct
  );
router
  .route('/:id')
  .delete(deleteProduct)
  .put(
    multipleSinglePhotos([{ name: 'images', maxCount: 4 }], 'product'),
    processMultipleImages,
    updateProduct
  );

module.exports = router;
