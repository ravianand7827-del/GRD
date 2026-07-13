const Tour = require('../models/Tour');

exports.getTours = async (req, res) => {
  try {
    const { category, destination, minPrice, maxPrice, duration, page = 1, limit = 12, sort = '-createdAt', featured } = req.query;
    const query = { isActive: true };
    if (category) query.category = category;
    if (destination) query.destination = new RegExp(destination, 'i');
    if (featured === 'true') query.isFeatured = true;
    if (minPrice || maxPrice) {
      query['price.adult'] = {};
      if (minPrice) query['price.adult'].$gte = Number(minPrice);
      if (maxPrice) query['price.adult'].$lte = Number(maxPrice);
    }
    if (duration) {
      const [min, max] = duration.split('-').map(Number);
      query['duration.days'] = { $gte: min, ...(max && { $lte: max }) };
    }
    const total = await Tour.countDocuments(query);
    const tours = await Tour.find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .select('-itinerary -inclusions -exclusions');
    res.json({ success: true, total, page: Number(page), pages: Math.ceil(total / limit), tours });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findOne({ slug: req.params.slug, isActive: true });
    if (!tour) return res.status(404).json({ success: false, message: 'Tour not found' });
    res.json({ success: true, tour });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createTour = async (req, res) => {
  try {
    const tour = await Tour.create(req.body);
    res.status(201).json({ success: true, tour });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!tour) return res.status(404).json({ success: false, message: 'Tour not found' });
    res.json({ success: true, tour });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ success: true, message: 'Tour deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.searchTours = async (req, res) => {
  try {
    const { q } = req.query;
    const tours = await Tour.find({
      isActive: true,
      $or: [
        { title: new RegExp(q, 'i') },
        { destination: new RegExp(q, 'i') },
        { tags: new RegExp(q, 'i') },
      ],
    }).limit(10).select('title slug destination coverImage price duration');
    res.json({ success: true, tours });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
