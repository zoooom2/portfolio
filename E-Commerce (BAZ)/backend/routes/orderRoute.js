const express = require('express');
const OrderController = require('../controllers/orderController');
const authController = require('../controllers/authControllers');
const paystackCheckout = require('../controllers/paystackCheckout');
const paypalCheckout = require('../controllers/paypalCheckout');

const router = express.Router();
const { protect, restrictTo } = authController;
const { getAllOrders, getOrder, updateOrder, deleteOrder } = OrderController;

router.use(protect);

//paystack user actions
router.post('/paystack/checkout-session', paystackCheckout.getCheckoutSession);
router.get('/paystack/createOrder', paystackCheckout.createOrder);

//paypal user actions
router.route('/paypal').post(paypalCheckout.createOrder);
router.route('/paypal/:orderID/pay').post(paypalCheckout.captureOrder);

router.use(restrictTo('admin'));

router
  .route('/paystack/:id')
  .patch(paystackCheckout.filterUpdateOrder, updateOrder);

router.route('/').get(getAllOrders);
// router.route('/paystackCheckout').post(createOrder);

router.route('/:id').get(getOrder).delete(deleteOrder);

module.exports = router;
