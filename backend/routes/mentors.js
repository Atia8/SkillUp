const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');
const authMiddleware = require('../middleware/authMiddleware');
// GET /api/mentors - Get all users for discovery page
router.get('/', authMiddleware, async (req, res) => {
  try {
     console.log('✅ Fetching all mentors for discovery page');
     const currentUserId = req.user.id;

     const query = `
      SELECT 
        u.id,
        u.name,
        u.email,
        up.title,
        up.avatar_url,
        COALESCE(AVG(r.rating), 0) as rating,
        COUNT(r.id) as review_count,
        up.bio,
        GROUP_CONCAT(us.skill_name) as skill_names 
      FROM users u
      LEFT JOIN user_profiles up ON u.id = up.user_id
      LEFT JOIN reviews r ON u.id = r.reviewee_id
      LEFT JOIN user_skills us ON u.id = us.user_id
       WHERE u.id != ?
      GROUP BY u.id
      ORDER BY rating DESC, review_count DESC
    `;
    //const [mentors] = await pool.execute(query);
    // group concat if user has more than one skills

    const [mentors] = await pool.execute(query, [currentUserId]);

    
     // Format the response to match your frontend expectations
    const formattedMentors = mentors.map(mentor => ({
      id: mentor.id,
      name: mentor.name,
      title: mentor.title || '--',
      avatar_url: mentor.avatar_url, // This will match your frontend 'avatar' field
      rating: parseFloat(mentor.rating).toFixed(1), // Format to 1 decimal
      reviewCount: mentor.review_count,
      bio: mentor.bio || '--',
      skills: mentor.skill_names 
    ? mentor.skill_names.split(',').map(skill => ({ skill_name: skill.trim() }))
    : []
    }));

     console.log(`✅ Found ${formattedMentors.length} mentors`);
    res.json(formattedMentors);
  } catch (error) {
    // Error handling
     console.error('❌ Mentors fetch error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch mentors',
      error: error.message 
    });
  }
});

module.exports = router;