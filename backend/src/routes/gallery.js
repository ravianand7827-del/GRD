const express = require('express');
const router = express.Router();
const { getGallery, uploadMedia, deleteMedia } = require('../controllers/galleryController');
const { protect, adminOnly } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', getGallery);
router.post('/', protect, adminOnly, (req, res, next) => { req.uploadFolder = 'gallery'; next(); }, upload.single('image'), uploadMedia);
router.delete('/:id', protect, adminOnly, deleteMedia);

module.exports = router;
