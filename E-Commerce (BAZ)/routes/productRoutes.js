const express = require('express');
const productController = require('../controllers/productsController');
const authController = require('../controllers/authController');

const router = express.Router();
const {
  getAllProducts,
  getProduct,
  updateProduct,
  uploadProduct,
  deleteAllProduct,
  deleteProduct,
} = productController;

const { restrictTo } = authController;

router.route('/').get(getAllProducts);
router.route('/:id').get(getProduct);

router.use(restrictTo('admin'));
router.route('/').delete(deleteAllProduct).post(uploadProduct);
router.route('/:id').delete(deleteProduct).patch(updateProduct);

module.exports = router;
