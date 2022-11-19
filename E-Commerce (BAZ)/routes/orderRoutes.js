const express = require('express');
const OrderController = require('../controllers/orderController');
const authController = require('../controllers/authController');

const router = express.Router();
const { protect, restrictTo } = authController;
const {
  getCheckoutSession,
  getAllOrders,
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
} = OrderController;

router.use(protect);

router.get('/checkout-session/:tourId', getCheckoutSession);

router.use(restrictTo('admin'));

router.route('/').get(getAllOrders).post(createOrder);

router.route('/:id').get(getOrder).patch(updateOrder).delete(deleteOrder);

module.exports = router;
