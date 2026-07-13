const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: {
    type: String,
    enum: ['travel-tips', 'destination-guide', 'visa-info', 'packing-guide', 'news', 'other'],
    default: 'travel-tips',
  },
  tags: [String],
  coverImage: { url: String, publicId: String },
  images: [{ url: String, publicId: String }],
  isPublished: { type: Boolean, default: false },
  isFeatured: { type: Boolean, default: false },
  viewCount: { type: Number, default: 0 },
  readTime: { type: Number, default: 5 }, // minutes
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String],
  },
}, { timestamps: true });

blogSchema.index({ slug: 1, isPublished: 1, category: 1 });

module.exports = mongoose.model('Blog', blogSchema);
