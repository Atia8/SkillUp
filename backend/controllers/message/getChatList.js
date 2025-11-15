// // backend/controllers/message/getChatList.js
// const { pool } = require('../../config/database');

// const getChatList = async (req, res) => {
//   try {
//     const currentUserId = req.user.id;

//     console.log('📋 Getting chat list for user:', currentUserId);

//     // Get all unique chat partners
//     const [chatPartners] = await pool.execute(`
//       SELECT DISTINCT 
//         CASE 
//           WHEN sender_id = ? THEN receiver_id 
//           ELSE sender_id 
//         END as partner_id
//       FROM messages 
//       WHERE sender_id = ? OR receiver_id = ?
//     `, [currentUserId, currentUserId, currentUserId]);

//     if (chatPartners.length === 0) {
//       return res.json([]);
//     }

//     // Get user details for each partner
//     const partnerIds = chatPartners.map(p => p.partner_id);
//     const placeholders = partnerIds.map(() => '?').join(',');

//     const [conversations] = await pool.execute(`
//       SELECT 
//         u.id as user_id,
//         u.name as user_name,
//         up.avatar_url as user_avatar,
//         up.title as user_title,
//         (
//           SELECT content FROM messages 
//           WHERE (sender_id = ? AND receiver_id = u.id) 
//              OR (sender_id = u.id AND receiver_id = ?)
//           ORDER BY created_at DESC LIMIT 1
//         ) as last_message,
//         (
//           SELECT created_at FROM messages 
//           WHERE (sender_id = ? AND receiver_id = u.id) 
//              OR (sender_id = u.id AND receiver_id = ?)
//           ORDER BY created_at DESC LIMIT 1
//         ) as last_message_time,
//         (
//           SELECT sender_id FROM messages 
//           WHERE (sender_id = ? AND receiver_id = u.id) 
//              OR (sender_id = u.id AND receiver_id = ?)
//           ORDER BY created_at DESC LIMIT 1
//         ) as last_message_sender_id,
//         (
//           SELECT COUNT(*) FROM messages 
//           WHERE sender_id = u.id AND receiver_id = ? AND is_read = 0
//         ) as unread_count
//       FROM users u
//       LEFT JOIN user_profiles up ON u.id = up.user_id
//       WHERE u.id IN (${placeholders})
//       ORDER BY last_message_time DESC
//     `, [
//       currentUserId, currentUserId,  // For last_message
//       currentUserId, currentUserId,  // For last_message_time  
//       currentUserId, currentUserId,  // For last_message_sender_id
//       currentUserId,                 // For unread_count
//       ...partnerIds                  // For the IN clause
//     ]);

//     console.log('✅ Found', conversations.length, 'conversations');
//     res.json(conversations);

//   } catch (error) {
//     console.error('❌ Get chat list error:', error);
//     res.status(500).json({ error: error.message });
//   }
// };

// module.exports = getChatList;

// backend/controllers/message/getChatList.js
const { pool } = require('../../config/database');

const getChatList = async (req, res) => {
  try {
    const currentUserId = req.user.id;

    console.log('🔍 DEBUG: Current user ID from token:', currentUserId);

    // STEP 1: First, let's check if there are ANY messages for this user
    const [allMessages] = await pool.execute(`
      SELECT * FROM messages 
      WHERE sender_id = ? OR receiver_id = ?
      LIMIT 5
    `, [currentUserId, currentUserId]);

    console.log('🔍 DEBUG: Raw messages found:', allMessages);

    // STEP 2: Get all unique chat partners
    const [chatPartners] = await pool.execute(`
      SELECT DISTINCT 
        CASE 
          WHEN sender_id = ? THEN receiver_id 
          ELSE sender_id 
        END as partner_id
      FROM messages 
      WHERE sender_id = ? OR receiver_id = ?
    `, [currentUserId, currentUserId, currentUserId]);

    console.log('🔍 DEBUG: Chat partners found:', chatPartners);

    if (chatPartners.length === 0) {
      console.log('❌ DEBUG: No chat partners found. Possible issues:');
      console.log('   - User ID might be wrong:', currentUserId);
      console.log('   - No messages in database for this user');
      console.log('   - Messages table might be empty');
      return res.json([]);
    }

    // STEP 3: Get user details for each partner
    const partnerIds = chatPartners.map(p => p.partner_id);
    console.log('🔍 DEBUG: Partner IDs:', partnerIds);

    const placeholders = partnerIds.map(() => '?').join(',');

    const [conversations] = await pool.execute(`
      SELECT 
        u.id as user_id,
        u.name as user_name,
        up.avatar_url as user_avatar,
        up.title as user_title,
        (
          SELECT content FROM messages 
          WHERE (sender_id = ? AND receiver_id = u.id) 
             OR (sender_id = u.id AND receiver_id = ?)
          ORDER BY created_at DESC LIMIT 1
        ) as last_message,
        (
          SELECT created_at FROM messages 
          WHERE (sender_id = ? AND receiver_id = u.id) 
             OR (sender_id = u.id AND receiver_id = ?)
          ORDER BY created_at DESC LIMIT 1
        ) as last_message_time,
          (
      SELECT sender_id FROM messages 
      WHERE (sender_id = ? AND receiver_id = u.id) 
         OR (sender_id = u.id AND receiver_id = ?)
      ORDER BY created_at DESC LIMIT 1
    ) as last_message_sender_id 
        
      FROM users u
      LEFT JOIN user_profiles up ON u.id = up.user_id
      WHERE u.id IN (${placeholders})
      ORDER BY last_message_time DESC
    `, [
      currentUserId, currentUserId,  // For last_message
      currentUserId, currentUserId,  // For last_message_time
       currentUserId, currentUserId,  // For last_message_sender_id
      ...partnerIds                  // For the IN clause
    ]);

    console.log('✅ DEBUG: Final conversations:', conversations);
    res.json(conversations);

  } catch (error) {
    console.error('❌ Get chat list error:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = getChatList;