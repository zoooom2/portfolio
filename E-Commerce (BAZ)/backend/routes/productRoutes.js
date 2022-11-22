const express = require('express');
const productController = require('../controllers/productsController');
const authController = require('../controllers/authControllers');
const {
  resizeMultiplePhotos,
  multiplePhotos,
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

router.use(restrictTo('admin'));
router.use(protect);
router.route('/').post(
  multiplePhotos([
    { name: 'coverImage', maxCount: 1 },
    { name: 'otherImages', maxCount: 5 },
  ]),
  resizeMultiplePhotos(2000, 1333, 'product', 'productImage'),
  uploadProduct
);
router.route('/:id').delete(deleteProduct).patch(updateProduct);

module.exports = router;
