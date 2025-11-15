const {pool} = require('../../config/database');

// controllers/wishlist/getWishes.js
const getWishes = async (req, res) => {
  try {
    const userId = req.params.userId;

    const [wishes] = await pool.execute(
      'SELECT * FROM wishlist WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );

    res.json({
      success: true,
      wishes: wishes
    });

  } catch (error) {
    console.error('Get wishes error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = getWishes;