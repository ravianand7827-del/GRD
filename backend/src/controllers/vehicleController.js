const Vehicle = require('../models/Vehicle');

exports.getVehicles = async (req, res) => {
  try {
    const { type, capacity, page = 1, limit = 12, featured } = req.query;
    const query = { isActive: true };
    if (type) query.type = type;
    if (capacity) query.capacity = { $gte: Number(capacity) };
    if (featured === 'true') query.isFeatured = true;
    const total = await Vehicle.countDocuments(query);
    const vehicles = await Vehicle.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json({ success: true, total, vehicles });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({ slug: req.params.slug, isActive: true });
    if (!vehicle) return res.status(404).json({ success: false, message: 'Vehicle not found' });
    res.json({ success: true, vehicle });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.create(req.body);
    res.status(201).json({ success: true, vehicle });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!vehicle) return res.status(404).json({ success: false, message: 'Vehicle not found' });
    res.json({ success: true, vehicle });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.deleteVehicle = async (req, res) => {
  try {
    await Vehicle.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ success: true, message: 'Vehicle deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
