const Razorpay = require('razorpay');
const Stripe = require('stripe');
const crypto = require('crypto');
const Payment = require('../models/Payment');
const Booking = require('../models/Booking');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create Razorpay order
exports.createRazorpayOrder = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const booking = await Booking.findOne({ bookingId, user: req.user._id });
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });

    const order = await razorpay.orders.create({
      amount: Math.round(booking.pricing.totalAmount * 100),
      currency: 'INR',
      receipt: booking.bookingId,
    });

    const payment = await Payment.create({
      booking: booking._id,
      user: req.user._id,
      amount: booking.pricing.totalAmount,
      gateway: 'razorpay',
      gatewayOrderId: order.id,
    });

    res.json({ success: true, order, payment: payment._id, key: process.env.RAZORPAY_KEY_ID });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Verify Razorpay payment
exports.verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, paymentId } = req.body;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Payment verification failed' });
    }

    const payment = await Payment.findByIdAndUpdate(paymentId, {
      gatewayPaymentId: razorpay_payment_id,
      gatewaySignature: razorpay_signature,
      status: 'paid',
    }, { new: true });

    await Booking.findByIdAndUpdate(payment.booking, {
      paymentStatus: 'paid',
      paymentId: razorpay_payment_id,
      status: 'confirmed',
      confirmedAt: new Date(),
    });

    res.json({ success: true, message: 'Payment verified successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Create Stripe payment intent
exports.createStripeIntent = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const booking = await Booking.findOne({ bookingId, user: req.user._id });
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });

    const intent = await stripe.paymentIntents.create({
      amount: Math.round(booking.pricing.totalAmount * 100),
      currency: 'inr',
      metadata: { bookingId: booking.bookingId },
    });

    await Payment.create({
      booking: booking._id,
      user: req.user._id,
      amount: booking.pricing.totalAmount,
      gateway: 'stripe',
      gatewayOrderId: intent.id,
    });

    res.json({ success: true, clientSecret: intent.client_secret });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
