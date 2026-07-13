const Booking = require('../models/Booking');
const Tour = require('../models/Tour');
const Vehicle = require('../models/Vehicle');
const Coupon = require('../models/Coupon');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

exports.createBooking = async (req, res) => {
  try {
    const { bookingType, tourId, vehicleId, travelDates, passengers, hotelCategory, mealPlan,
      pickupLocation, dropLocation, specialRequests, couponCode, paymentMethod, customerDetails } = req.body;

    let basePrice = 0;
    let hotelPrice = 0;
    let mealPrice = 0;

    if (bookingType === 'tour' && tourId) {
      const tour = await Tour.findById(tourId);
      if (!tour) return res.status(404).json({ success: false, message: 'Tour not found' });
      basePrice = tour.price.adult * (passengers.adults || 1) + (tour.price.child || 0) * (passengers.children || 0);
      const hotel = tour.hotelOptions?.find(h => h.category === hotelCategory);
      if (hotel) hotelPrice = hotel.pricePerNight * tour.duration.nights * (passengers.adults || 1);
      const meal = tour.mealPlans?.find(m => m.type === mealPlan);
      if (meal) mealPrice = meal.pricePerPerson * tour.duration.days * (passengers.adults || 1);
    }

    if (bookingType === 'vehicle' && vehicleId) {
      const vehicle = await Vehicle.findById(vehicleId);
      if (!vehicle) return res.status(404).json({ success: false, message: 'Vehicle not found' });
      const days = Math.ceil((new Date(travelDates.endDate) - new Date(travelDates.startDate)) / (1000 * 60 * 60 * 24));
      basePrice = vehicle.pricing.perDay * days;
    }

    let discountAmount = 0;
    let couponDoc = null;
    if (couponCode) {
      couponDoc = await Coupon.findOne({ code: couponCode.toUpperCase(), isActive: true, validUntil: { $gte: new Date() } });
      if (couponDoc && couponDoc.usedCount < couponDoc.usageLimit) {
        const subtotal = basePrice + hotelPrice + mealPrice;
        if (subtotal >= couponDoc.minOrderAmount) {
          discountAmount = couponDoc.discountType === 'percentage'
            ? Math.min((subtotal * couponDoc.discountValue) / 100, couponDoc.maxDiscount || Infinity)
            : couponDoc.discountValue;
        }
      }
    }

    const taxAmount = Math.round((basePrice + hotelPrice + mealPrice - discountAmount) * 0.05);
    const totalAmount = basePrice + hotelPrice + mealPrice - discountAmount + taxAmount;

    const booking = await Booking.create({
      user: req.user._id,
      bookingType,
      tour: tourId,
      vehicle: vehicleId,
      travelDates,
      passengers,
      hotelCategory,
      mealPlan,
      pickupLocation,
      dropLocation,
      specialRequests,
      coupon: couponDoc?._id,
      couponCode,
      paymentMethod,
      customerDetails: customerDetails || { name: req.user.name, email: req.user.email, phone: req.user.phone },
      pricing: { basePrice, hotelPrice, mealPrice, taxAmount, discountAmount, totalAmount },
    });

    if (couponDoc) {
      couponDoc.usedCount += 1;
      couponDoc.usedBy.push(req.user._id);
      await couponDoc.save();
    }

    // Send confirmation email
    await transporter.sendMail({
      from: `"GRD Travels" <${process.env.FROM_EMAIL}>`,
      to: booking.customerDetails.email,
      subject: `Booking Confirmed - ${booking.bookingId}`,
      html: `<h2>Booking Confirmed!</h2><p>Booking ID: <strong>${booking.bookingId}</strong></p><p>Total: ₹${totalAmount}</p><p>Thank you for choosing GRD Travels!</p>`,
    });

    res.status(201).json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('tour', 'title slug coverImage')
      .populate('vehicle', 'name slug coverImage')
      .sort('-createdAt');
    res.json({ success: true, bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({ bookingId: req.params.bookingId, user: req.user._id })
      .populate('tour vehicle');
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    res.json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({ bookingId: req.params.bookingId, user: req.user._id });
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    if (['cancelled', 'completed'].includes(booking.status)) {
      return res.status(400).json({ success: false, message: 'Cannot cancel this booking' });
    }
    booking.status = 'cancelled';
    booking.cancellationReason = req.body.reason;
    booking.cancelledAt = new Date();
    await booking.save();
    res.json({ success: true, message: 'Booking cancelled', booking });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Admin: get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = status ? { status } : {};
    const total = await Booking.countDocuments(query);
    const bookings = await Booking.find(query)
      .populate('user', 'name email phone')
      .populate('tour', 'title')
      .populate('vehicle', 'name')
      .sort('-createdAt')
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json({ success: true, total, bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    res.json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
