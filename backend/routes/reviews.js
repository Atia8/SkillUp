const express = require('express');
const router = express.Router();
const { getReviewsByUser } = require('../controllers/reviewController');
const { createReview } = require('../controllers/giveReviewController');
const authMiddleware = require('../middleware/authMiddleware');

console.log('✅ Reviews route loaded');

// GET /api/reviews/user/:userId - Get reviews for a user
router.get('/user/:userId', getReviewsByUser);
router.post('/:userId', authMiddleware, createReview);

module.exports = router;