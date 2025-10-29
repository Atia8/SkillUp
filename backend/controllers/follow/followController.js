const {pool} = require('../../config/database');
const followUser = async (req, res) => {
 
  try{
 console.log('=== FOLLOW REQUEST START ===');
    console.log('followerId:', req.user.id);
    console.log('followingId:', req.params.userId); 

 const followerId = req.user.id;
  const followingId = parseInt(req.params.userId);
     // Query 1: Check if user exists
    const userCheckQuery = `
      SELECT id FROM users WHERE id = ?
    `;
 const [userExists] = await pool.execute(userCheckQuery, [followingId]);
 if (userExists.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Query 2: Check if already following
    const existingCheckQuery = `
      SELECT * FROM followers WHERE follower_id = ? AND following_id = ?
    `;
    const [existing] = await pool.execute(existingCheckQuery, [followerId, followingId]);
     if (existing.length > 0) {
      return res.status(400).json({ error: 'Already following this user' });
    }

    // Query 3: Insert follow relationship
    const insertFollowQuery = `
      INSERT INTO followers (follower_id, following_id) 
      VALUES (?, ?)
    `;
   await pool.execute(insertFollowQuery, [followerId, followingId]);
    res.json({ 
      success: true, 
      message: 'Successfully followed user',
      action: 'followed'
    });

}
catch(error){
  console.error('Follow error:', error);
    res.status(500).json({ error: 'Internal server error' });
}
};
module.exports = followUser

