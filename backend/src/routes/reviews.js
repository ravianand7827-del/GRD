const express = require('express');
const router = express.Router();
const { getReviews, createReview, approveReview, deleteReview } = require('../controllers/reviewController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/', getReviews);
router.post('/', protect, createReview);
router.put('/:id/approve', protect, adminOnly, approveReview);
router.delete('/:id', protect, adminOnly, deleteReview);

module.exports = router;
