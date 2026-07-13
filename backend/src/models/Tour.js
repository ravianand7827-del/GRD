const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
  day: Number,
  title: String,
  description: String,
  meals: [String],
  accommodation: String,
});

const tourSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  description: { type: String, required: true },
  shortDescription: { type: String },
  category: {
    type: String,
    enum: ['domestic', 'international', 'honeymoon', 'adventure', 'pilgrimage', 'luxury', 'group', 'corporate', 'weekend', 'family'],
    required: true,
  },
  destination: { type: String, required: true },
  duration: { days: Number, nights: Number },
  price: {
    adult: { type: Number, required: true },
    child: { type: Number, default: 0 },
    infant: { type: Number, default: 0 },
  },
  discountedPrice: { adult: Number, child: Number },
  images: [{ url: String, publicId: String, alt: String }],
  coverImage: { url: String, publicId: String },
  itinerary: [itinerarySchema],
  inclusions: [String],
  exclusions: [String],
  highlights: [String],
  hotelOptions: [{
    category: { type: String, enum: ['budget', 'standard', 'deluxe', 'luxury'] },
    name: String,
    pricePerNight: Number,
  }],
  mealPlans: [{
    type: { type: String, enum: ['EP', 'CP', 'MAP', 'AP'] },
    description: String,
    pricePerPerson: Number,
  }],
  maxGroupSize: { type: Number, default: 20 },
  minGroupSize: { type: Number, default: 1 },
  difficulty: { type: String, enum: ['easy', 'moderate', 'challenging'], default: 'easy' },
  startDates: [Date],
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0 },
  bookingCount: { type: Number, default: 0 },
  tags: [String],
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String],
  },
}, { timestamps: true });

tourSchema.index({ slug: 1, category: 1, destination: 1, isActive: 1 });

module.exports = mongoose.model('Tour', tourSchema);
