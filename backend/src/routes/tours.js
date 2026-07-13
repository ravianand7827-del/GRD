const express = require('express');
const router = express.Router();
const { getTours, getTour, createTour, updateTour, deleteTour, searchTours } = require('../controllers/tourController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/', getTours);
router.get('/search', searchTours);
router.get('/:slug', getTour);
router.post('/', protect, adminOnly, createTour);
router.put('/:id', protect, adminOnly, updateTour);
router.delete('/:id', protect, adminOnly, deleteTour);

module.exports = router;
