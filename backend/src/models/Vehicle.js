const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  type: {
    type: String,
    enum: ['tempo-traveller', 'luxury-bus', 'mini-bus', 'urbania', 'suv', 'sedan', 'volvo', 'coach'],
    required: true,
  },
  capacity: { type: Number, required: true },
  description: { type: String },
  images: [{ url: String, publicId: String, alt: String }],
  coverImage: { url: String, publicId: String },
  specifications: {
    engine: String,
    fuelType: String,
    transmission: String,
    ac: Boolean,
    luggage: String,
    mileage: String,
  },
  features: [String],
  pricing: {
    perKm: Number,
    perDay: Number,
    perHour: Number,
    minimumKm: Number,
    driverAllowance: Number,
    nightCharges: Number,
  },
  availability: { type: Boolean, default: true },
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String],
  },
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', vehicleSchema);
