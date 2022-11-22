const express = require('express');
const productController = require('../controllers/productsController');
const authController = require('../controllers/authControllers');
const {
  resizeMultiplePhotos,
  multipleSinglePhotos,
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

router.use(restrictTo('admin'));

router
  .route('/')
  .post(
    multipleSinglePhotos({ name: 'coverImages', maxCount: 4 }),
    resizeMultiplePhotos(2000, 1333, 'product', 'productImage'),
    uploadProduct
  );
router.route('/:id').delete(deleteProduct).patch(updateProduct);

module.exports = router;
