const {pool} = require('../../config/database');

// POST /api/wishlist
const addToWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { skillName } = req.body;

    const [result] = await pool.execute(
      'INSERT INTO wishlist (user_id, wish_skill_name) VALUES (?, ?)',
      [userId, skillName]
    );

    res.json({ success: true, wishId: result.insertId });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Skill already in wishlist' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};
module.exports = addToWishlist;
