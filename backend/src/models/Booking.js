const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingId: { type: String, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bookingType: { type: String, enum: ['tour', 'vehicle'], required: true },
  tour: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour' },
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' },
  travelDates: {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  passengers: {
    adults: { type: Number, default: 1 },
    children: { type: Number, default: 0 },
    infants: { type: Number, default: 0 },
  },
  hotelCategory: { type: String, enum: ['budget', 'standard', 'deluxe', 'luxury'] },
  mealPlan: { type: String, enum: ['EP', 'CP', 'MAP', 'AP'] },
  pickupLocation: { type: String },
  dropLocation: { type: String },
  specialRequests: { type: String },
  pricing: {
    basePrice: Number,
    hotelPrice: Number,
    mealPrice: Number,
    taxAmount: Number,
    discountAmount: Number,
    totalAmount: { type: Number, required: true },
  },
  coupon: { type: mongoose.Schema.Types.ObjectId, ref: 'Coupon' },
  couponCode: String,
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed', 'refunded'],
    default: 'pending',
  },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed', 'refunded'], default: 'pending' },
  paymentMethod: { type: String, enum: ['razorpay', 'stripe', 'offline'] },
  paymentId: String,
  invoiceUrl: String,
  customerDetails: {
    name: String,
    email: String,
    phone: String,
    address: String,
  },
  cancellationReason: String,
  cancelledAt: Date,
  confirmedAt: Date,
}, { timestamps: true });

// Auto-generate booking ID
bookingSchema.pre('save', async function (next) {
  if (!this.bookingId) {
    const count = await mongoose.model('Booking').countDocuments();
    this.bookingId = `GRD${Date.now().toString().slice(-6)}${(count + 1).toString().padStart(4, '0')}`;
  }
  next();
});

bookingSchema.index({ user: 1, status: 1, bookingType: 1 });

module.exports = mongoose.model('Booking', bookingSchema);
