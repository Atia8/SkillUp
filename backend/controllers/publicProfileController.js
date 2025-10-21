const { pool } = require('../config/database');

// Get public profile for any user - PUBLIC
const getPublicProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log('Fetching public profile for user:', userId);

    const [users] = await pool.execute(
      `SELECT u.id, u.name, up.title, up.bio, up.avatar_url 
       FROM users u 
       LEFT JOIN user_profiles up ON u.id = up.user_id 
       WHERE u.id = ?`,
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get review stats
    const [reviews] = await pool.execute(
      `SELECT rating FROM reviews WHERE reviewee_id = ?`,
      [userId]
    );

    const reviewCount = reviews.length;
    const avgRating = reviews.length > 0 
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length 
      : 0;

    // Public user data (no sensitive info)
    const userData = {
      id: users[0].id,
      name: users[0].name,
      title: users[0].title || '--',
      bio: users[0].bio || '--',
      avatar_url: users[0].avatar_url,
      rating: parseFloat(avgRating).toFixed(1),
      reviewCount: reviewCount,
      followerCount: 0,
      followingCount: 0
    };

    res.json(userData);

  } catch (error) {
    console.error('Public profile fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
};

module.exports = {
  getPublicProfile
};