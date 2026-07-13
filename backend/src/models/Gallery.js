const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  url: { type: String, required: true },
  publicId: String,
  type: { type: String, enum: ['image', 'video'], default: 'image' },
  category: { type: String, enum: ['destination', 'vehicle', 'team', 'customer', 'event'], default: 'destination' },
  tags: [String],
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Gallery', gallerySchema);
