const {pool} = require('../../config/database');

// controllers/wishlist/removeWish.js
const removeWish = async (req, res) => {
  try {
    const wishId = req.params.wishId;
    const userId = req.user.id; // From auth middleware

    // Delete the wish (and verify it belongs to the user)
    const [result] = await pool.execute(
      'DELETE FROM wishlist WHERE id = ? AND user_id = ?',
      [wishId, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        error: 'Wish not found or you do not have permission to delete it' 
      });
    }

    res.json({
      success: true,
      message: 'Wish removed successfully'
    });

  } catch (error) {
    console.error('Remove wish error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = removeWish;