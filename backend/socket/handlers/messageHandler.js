// backend/socket/handlers/messageHandler.js
const { pool } = require('../../config/database');

const handleSendMessage = async (socket, data) => {
  try {
    console.log('📨 Real-time message:', data);
    
    const { senderId, receiverId, content } = data;

    // Save to database
    const [result] = await pool.execute(
      'INSERT INTO messages (sender_id, receiver_id, content) VALUES (?, ?, ?)',
      [senderId, receiverId, content]
    );

    // Get full message details
    const [messages] = await pool.execute(`
      SELECT m.*, u.name as sender_name
      FROM messages m 
      JOIN users u ON m.sender_id = u.id 
      WHERE m.id = ?
    `, [result.insertId]);

    const messageWithDetails = messages[0];

    // Real-time delivery
    socket.to(`user_${receiverId}`).emit('new_message', messageWithDetails);
    socket.emit('new_message', messageWithDetails);

    console.log(`⚡ Message delivered to user_${receiverId}`);

  } catch (error) {
    console.error('❌ Message error:', error);
    socket.emit('message_error', { error: 'Failed to send message' });
  }
};

module.exports = { handleSendMessage };