const {pool} = require('../../config/database');
const unfollowUser = async (req, res) => {
try{

  const followerId = req.user.id;
    const followingId = parseInt(req.params.userId);

    // Query: Delete follow relationship
    const unfollowQuery = `
      DELETE FROM followers 
      WHERE follower_id = ? AND following_id = ?
    `;
    const [result] = await pool.execute(unfollowQuery, [followerId, followingId]);
    
    if (result.affectedRows === 0) {
      return res.status(400).json({ error: 'Not following this user' });
    }

    res.json({ 
      success: true, 
      message: 'Successfully unfollowed user',
      action: 'unfollowed'
    });


}
catch(error){
   console.error('Unfollow error:', error);
    res.status(500).json({ error: 'Internal server error' });
}
};
module.exports = unfollowUser;
