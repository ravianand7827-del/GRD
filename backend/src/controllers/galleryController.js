const Gallery = require('../models/Gallery');
const cloudinary = require('../config/cloudinary');

exports.getGallery = async (req, res) => {
  try {
    const { category, type } = req.query;
    const query = { isActive: true };
    if (category) query.category = category;
    if (type) query.type = type;
    const gallery = await Gallery.find(query).sort('order -createdAt');
    res.json({ success: true, gallery });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.uploadMedia = async (req, res) => {
  try {
    const { title, description, category, tags } = req.body;
    const item = await Gallery.create({
      title,
      description,
      category,
      tags: tags ? tags.split(',').map(t => t.trim()) : [],
      url: req.file.path,
      publicId: req.file.filename,
    });
    res.status(201).json({ success: true, item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteMedia = async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Media not found' });
    if (item.publicId) await cloudinary.uploader.destroy(item.publicId);
    await item.deleteOne();
    res.json({ success: true, message: 'Media deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
