const User = require('../models/User');
const Tour = require('../models/Tour');
const Vehicle = require('../models/Vehicle');
const Booking = require('../models/Booking');
const Payment = require('../models/Payment');
const Review = require('../models/Review');

exports.getDashboardStats = async (req, res) => {
  try {
    const [users, tours, vehicles, bookings, payments, pendingReviews] = await Promise.all([
      User.countDocuments({ role: 'user' }),
      Tour.countDocuments({ isActive: true }),
      Vehicle.countDocuments({ isActive: true }),
      Booking.countDocuments(),
      Payment.aggregate([{ $match: { status: 'paid' } }, { $group: { _id: null, total: { $sum: '$amount' } } }]),
      Review.countDocuments({ isApproved: false }),
    ]);

    const recentBookings = await Booking.find()
      .populate('user', 'name email')
      .populate('tour', 'title')
      .populate('vehicle', 'name')
      .sort('-createdAt')
      .limit(5);

    const monthlyRevenue = await Payment.aggregate([
      { $match: { status: 'paid', createdAt: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 6)) } } },
      { $group: { _id: { month: { $month: '$createdAt' }, year: { $year: '$createdAt' } }, revenue: { $sum: '$amount' } } },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]);

    res.json({
      success: true,
      stats: {
        users,
        tours,
        vehicles,
        bookings,
        totalRevenue: payments[0]?.total || 0,
        pendingReviews,
      },
      recentBookings,
      monthlyRevenue,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    const query = { role: 'user' };
    if (search) query.$or = [{ name: new RegExp(search, 'i') }, { email: new RegExp(search, 'i') }];
    const total = await User.countDocuments(query);
    const users = await User.find(query).sort('-createdAt').skip((page - 1) * limit).limit(Number(limit));
    res.json({ success: true, total, users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    user.isActive = !user.isActive;
    await user.save();
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
