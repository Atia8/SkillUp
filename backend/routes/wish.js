const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const addToWishlist = require('../controllers/wishlist/addwish');
const getWishlist = require('../controllers/wishlist/getwish');
const removeWish = require('../controllers/wishlist/deletewish'); // Add this

//add wish
router.post('/', authMiddleware, addToWishlist);

//get wish
router.get('/:userId', getWishlist);

// Delete wish (protected)
router.delete('/:wishId', authMiddleware, removeWish);

module.exports = router;