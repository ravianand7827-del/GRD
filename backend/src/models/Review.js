const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tour: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour' },
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' },
  booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
  rating: { type: Number, required: true, min: 1, max: 5 },
  title: { type: String, trim: true },
  comment: { type: String, required: true },
  images: [{ url: String, publicId: String }],
  isApproved: { type: Boolean, default: false },
  isGoogleReview: { type: Boolean, default: false },
  googleReviewUrl: String,
  helpfulCount: { type: Number, default: 0 },
}, { timestamps: true });

// Update tour/vehicle rating after review save
reviewSchema.post('save', async function () {
  const Model = this.tour ? require('./Tour') : require('./Vehicle');
  const id = this.tour || this.vehicle;
  if (!id) return;
  const stats = await mongoose.model('Review').aggregate([
    { $match: { [this.tour ? 'tour' : 'vehicle']: id, isApproved: true } },
    { $group: { _id: null, avgRating: { $avg: '$rating' }, count: { $sum: 1 } } },
  ]);
  if (stats.length > 0) {
    await Model.findByIdAndUpdate(id, {
      rating: Math.round(stats[0].avgRating * 10) / 10,
      reviewCount: stats[0].count,
    });
  }
});

module.exports = mongoose.model('Review', reviewSchema);
