const {pool} = require('../../config/database');
const getFollowCount = async (req, res) => {
try{

    //const followerId = req.user.id;
    const userId = parseInt(req.params.userId);
 // Query 1: Get follower count
    const followerCountQuery = `
      SELECT COUNT(*) as count FROM followers WHERE following_id = ?
    `;
    const [followerCount] = await pool.execute(followerCountQuery, [userId]);

     // Query 2: Get following count
    const followingCountQuery = `
      SELECT COUNT(*) as count FROM followers WHERE follower_id = ?
    `;
    const [followingCount] = await pool.execute(followingCountQuery, [userId]);
  
       res.json({
      success: true,
      data: {
        followerCount: followerCount[0].count,
        followingCount: followingCount[0].count
      }
    });

}
catch(error){
    console.error('Follow stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
}


};  
module.exports = getFollowCount;
