const express = require('express');

const OrderController = require('../controllers/orderController');
const authController = require('../controllers/authControllers');
const paystackCheckout = require('../controllers/paystackCheckout');
const paypalCheckout = require('../controllers/paypalCheckout');

const { getCheckoutSession } = require('../controllers/stripeCheckout');

const router = express.Router();
const { protect, restrictTo } = authController;
const {
  getAllOrders,
  getOrder,
  deleteOrder,
  updateOrder,
  getMyOrders,
  orderPerTime,
  percentageChangeOrder,
} = OrderController;

//user order history
router.get('/myOrders', getMyOrders);

//get Total Amount for a particular period

//paystack user actions
router.post('/paystack/checkout-session', paystackCheckout.getCheckoutSession);
router.post('/paystack/webhook', paystackCheckout.payStackWebHook);

//paypal user actions
router.route('/paypal').post(paypalCheckout.createOrder);
router.route('/paypal/:orderID/pay').post(paypalCheckout.captureOrder);

// stripe user actions
router.route('/stripe-checkout').post(getCheckoutSession);
// router.route('//stripe-payment').post(stripeOrder);

router.use(protect);
router.use(restrictTo('admin'));

router.route('/paystack/verify/:reference').get(paystackCheckout.verifyOrder);
router.route('/paystack/:id').patch(paystackCheckout.updatePayStackOrder);
router.route('/').get(getAllOrders);
router.get('/totalOrder', orderPerTime);
router.get('/aggregateOrder', OrderController.aggregateOrders);
router.get('/bestSellers', OrderController.bestSellers);

router.get('/pctChange', percentageChangeOrder);
router.route('/:id').get(getOrder).delete(deleteOrder).patch(updateOrder);
module.exports = router;
