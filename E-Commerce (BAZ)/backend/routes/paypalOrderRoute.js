const express = require('express');
const { createOrder, captureOrder } = require('../controllers/paypalCheckout');

const router = express.Router();

router.route('/').post(createOrder);
router.route('/:orderID/pay').post(captureOrder);

module.exports = router;
