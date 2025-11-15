// controllers/message/getMessagesWithUser.js
const { pool } = require('../../config/database');

const getMessagesWithUser = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const otherUserId = req.params.otherUserId;

    console.log('📩 Getting messages between:', currentUserId, 'and', otherUserId);

    const [messages] = await pool.execute(`
      SELECT m.*, 
             u.name as sender_name,
             up.avatar_url as sender_avatar
      FROM messages m
      JOIN users u ON m.sender_id = u.id
      LEFT JOIN user_profiles up ON u.id = up.user_id
      WHERE (m.sender_id = ? AND m.receiver_id = ?) 
         OR (m.sender_id = ? AND m.receiver_id = ?)
      ORDER BY m.created_at ASC
    `, [currentUserId, otherUserId, otherUserId, currentUserId]);

    console.log('📨 Found', messages.length, 'messages');
    
    res.json(messages);
  } catch (error) {
    console.error('❌ Get messages error:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = getMessagesWithUser;