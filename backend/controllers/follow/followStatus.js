// controllers/follow/followStatus.js
const {pool} = require('../../config/database');

// Check if current user follows target user
const getFollowStatus = async (req, res) => {
  try {
    console.log('=== FOLLOW STATUS REQUEST START ===');
    console.log('Current User ID:', req.user.id);
    console.log('Target User ID:', req.params.userId);

    const  followerId= req.user.id;
    const  followingId = parseInt(req.params.userId);

    // Check if target user exists
    const userCheckQuery = `SELECT id FROM users WHERE id = ?`;
    const [userExists] = await pool.execute(userCheckQuery, [followingId]);
    
    console.log('Target user exists:', userExists.length > 0);
    
    if (userExists.length === 0) {
      return res.status(404).json({ 
        success: false,
        error: 'User not found' 
      });
    }

    // Check follow relationship
    const followCheckQuery = `
      SELECT * FROM followers 
      WHERE follower_id = ? AND following_id = ?
    `;
    const [result] = await pool.execute(followCheckQuery, [followerId, followingId]);
    
    const isFollowing = result.length > 0;
    
    console.log('Follow status result:', {
      followerId,
      followingId,
      isFollowing,
      foundRecords: result.length
    });

    res.json({
      success: true,
      data: {
        isFollowing: isFollowing,
        followerId: followerId,
        followerId: followingId
      }
    });

  } catch (error) {
    console.error('Follow status error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Internal server error' 
    });
  }
};

module.exports = getFollowStatus;