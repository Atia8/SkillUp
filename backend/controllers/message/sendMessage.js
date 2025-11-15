const {pool} = require('../../config/database');


// POST /api/messages - Send a new message
const sendMessage = async (req, res) => {
  try {
      console.log('📨 Send message request received');
    console.log('Request body:', req.body);
    console.log('User from auth:', req.user);
    
    const { receiverId, content } = req.body;
    const senderId = req.user.id; // From auth middleware

    // Insert into messages table
    const [result] = await pool.execute(
      'INSERT INTO messages (sender_id, receiver_id, content) VALUES (?, ?, ?)',
      [senderId, receiverId, content]
    );

    // Return the sent message
    const [messages] = await pool.execute(`
      SELECT m.*, u.name as sender_name, up.avatar_url as sender_avatar
      FROM messages m 
      JOIN users u ON m.sender_id = u.id 
      LEFT JOIN user_profiles up ON u.id = up.user_id
      WHERE m.id = ?
    `, [result.insertId]);

    res.json({
      success: true,
      message: messages[0]
    });

  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
};

module.exports = sendMessage;
