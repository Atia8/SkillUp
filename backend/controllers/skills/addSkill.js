const {pool} = require('../../config/database');



const addSkill = async (req, res) => {
  try {
    // 1. Get user ID from auth middleware
    userID=req.user.id;
    // 2. Get data from request body
    const { skillName, githubUrl, youtubeUrl } = req.body;
    // 3. Validate required fields
     if (!skillName || skillName.trim() === '') {
      return res.status(400).json({ error: 'Skill name is required' });
    }
    
  
     const trimmedSkillName = skillName.trim();
    
    // 4. Handle file upload if exists
     let certificateUrl = null;
    if (req.file) {
      certificateUrl = `${req.protocol}://${req.get('host')}/uploads/certificates/${req.file.filename}`;
    }

    // Check if skill exists first
    const [existingSkills] = await pool.execute(
      'SELECT * FROM user_skills WHERE user_id = ? AND skill_name = ?',
      [userID, trimmedSkillName]
    );

    const skillExists = existingSkills.length > 0;
    const existingSkill = skillExists ? existingSkills[0] : null;


    const cleanGithubUrl = githubUrl !== undefined ? (githubUrl.trim() || null) : (existingSkill?.project_github_url || null);
    const cleanYoutubeUrl = youtubeUrl !== undefined ? (youtubeUrl.trim() || null) : (existingSkill?.project_youtube_url || null);
    const finalcertificateUrl = certificateUrl !== null ? certificateUrl : (existingSkill?.certificate_url || null);

    const sqlQuery = `
  INSERT INTO user_skills 
    (user_id, skill_name, certificate_url, project_github_url, project_youtube_url) 
  VALUES (?, ?, ?, ?, ?)
  ON DUPLICATE KEY UPDATE 
    certificate_url = VALUES(certificate_url),
    project_github_url = VALUES(project_github_url),
    project_youtube_url = VALUES(project_youtube_url)
`;
// 5. Save to database
const [result] = await pool.execute(sqlQuery, [userID,trimmedSkillName,finalcertificateUrl,cleanGithubUrl,cleanYoutubeUrl]);
    

      // 6. Return success response
    res.json({
      success: true,
      message: 'Skill added successfully',
      skillId: result.insertId
    });
  } catch (error) {
    // 7. Handle errors
     console.error('Add skill error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = addSkill;