const { pool } = require('../config/database');

// Update user profile (title and bio)
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, bio } = req.body;

    console.log('Updating profile for user:', userId, 'with:', { title, bio });

    const query = `
      INSERT INTO user_profiles (user_id, title, bio, updated_at)
      VALUES (?, ?, ?, CURRENT_TIMESTAMP)
      ON DUPLICATE KEY UPDATE
      title = VALUES(title),
      bio = VALUES(bio),
      updated_at = VALUES(updated_at)
    `;

    await pool.execute(query, [userId, title, bio]);

    res.json({
      success: true,
      message: 'Profile updated successfully'
    });

  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating profile'
    });
  }
};

module.exports = {
  updateProfile
};