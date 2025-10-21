const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');
const authMiddleware = require('../middleware/authMiddleware');
const { updateProfile } = require('../controllers/profileController');

console.log('✅ Users route loaded');

//GET /api/users/profile
router.get('/profile', authMiddleware, async (req, res) =>{

// router.get('/test', async(req, res)=> {
//     console.log('✅ Test route hit!');
//   res.json({ message: 'Users route is working!' });
  try {
    const userId = req.user.id;
console.log('Fetching profile for user:', userId);

    // 1. Query users table
    const [users] = await pool.execute(
      'SELECT name, email FROM users WHERE id = ?',
      [userId]
    );
// 2. Query user_profiles table
    const [profiles] = await pool.execute(
      'SELECT bio, title, avatar_url FROM user_profiles WHERE user_id = ?',
      [userId]
    );

     const userData = {
      name: users[0]?.name,
      email: users[0]?.email,
      title: profiles[0]?.title || '--',
      bio: profiles[0]?.bio || '--',
      avatar_url: profiles[0]?.avatar_url,
      rating: 0,
      reviewCount: 0, 
      followerCount: 0,
      followingCount: 0
    };

    res.json(userData);

  } catch (error) {
    // Error handling
    console.error('Profile fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});
// PATCH /api/users/profile - Update profile
router.patch('/profile', authMiddleware, updateProfile);

module.exports = router;