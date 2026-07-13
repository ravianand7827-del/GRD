const express = require('express');
const router = express.Router();
const { createRazorpayOrder, verifyRazorpay, createStripeIntent } = require('../controllers/paymentController');
const { protect } = require('../middleware/auth');

router.post('/razorpay/order', protect, createRazorpayOrder);
router.post('/razorpay/verify', protect, verifyRazorpay);
router.post('/stripe/intent', protect, createStripeIntent);

module.exports = router;
