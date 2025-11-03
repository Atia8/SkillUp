const { pool } = require('../../config/database');

const getUserSkills = async (req, res) => {
  try {
    // 1. Get user ID from request params
    const userId = req.params.userId;
    
    // 2. Validate user ID
    if (!userId || isNaN(userId)) {
      return res.status(400).json({ error: 'Valid user ID is required' });
    }

    // 3. Query database for user's skills
    const sqlQuery = `
      SELECT id, skill_name, certificate_url, project_github_url, project_youtube_url, created_at
      FROM user_skills 
      WHERE user_id = ? 
      ORDER BY created_at DESC
    `;

    const [skills] = await pool.execute(sqlQuery, [userId]);

    // 4. Return skills (empty array if no skills)
    res.json({
      success: true,
      skills: skills
    });

  } catch (error) {
    // 5. Handle errors
    console.error('Get skills error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = getUserSkills;