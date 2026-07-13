const express = require('express');
const router = express.Router();
const { createBooking, getMyBookings, getBooking, cancelBooking, getAllBookings, updateBookingStatus } = require('../controllers/bookingController');
const { protect, adminOnly } = require('../middleware/auth');

router.post('/', protect, createBooking);
router.get('/my', protect, getMyBookings);
router.get('/all', protect, adminOnly, getAllBookings);
router.get('/:bookingId', protect, getBooking);
router.put('/:bookingId/cancel', protect, cancelBooking);
router.put('/:id/status', protect, adminOnly, updateBookingStatus);

module.exports = router;
