const express = require('express');
const productController = require('../controllers/productsController');
const authController = require('../controllers/authControllers');

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
router.route('/').post(uploadProduct);
router.route('/:id').delete(deleteProduct).patch(updateProduct);

module.exports = router;
