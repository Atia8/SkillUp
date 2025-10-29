// routes/follow.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const followUser= require('../controllers/follow/followController'); // Import from index
const getFollowStatus= require('../controllers/follow/followStatus'); // Import from index
const unfollowUser= require('../controllers/follow/Unfollow'); // Import from index
const getfollowCount= require('../controllers/follow/followCount'); // Import from index


  console.log('🎯 FOLLOW ROUTE HIT');

// POST /api/follow/:userId - Follow a user
router.post('/:userId', auth, followUser);

//for checking the follow status
router.get('/status/:userId', auth, getFollowStatus);

// DELETE /api/follow/:userId - Unfollow a user
router.delete('/:userId', auth, unfollowUser);

// GET /api/follow/stats/:userId - Get follower/following counts (Public)
router.get('/count/:userId',getfollowCount);

// router.post('/:userId', auth, (req, res, next) => {
//   console.log('🎯 FOLLOW ROUTE HIT');
//   console.log('Method:', req.method);
//   console.log('URL:', req.originalUrl);
//   console.log('Params:', req.params);
//   console.log('User:', req.user);
//   next();
// }, followUser);

module.exports = router;