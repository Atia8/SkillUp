const { pool } = require('../../config/database');

// Delete skill
const deleteSkill = async (req, res) => {
  try {
    const userId = req.user.id;
    const skillId = req.params.skillId;

    // Validate skillId
    if (!skillId || isNaN(skillId)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Valid skill ID is required' 
      });
    }

    console.log('Deleting skill:', { userId, skillId });

    // Delete the skill (only if it belongs to the user)
    const [result] = await pool.execute(
      'DELETE FROM user_skills WHERE id = ? AND user_id = ?',
      [skillId, userId]
    );

    // Check if any row was affected
    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'Skill not found or you do not have permission to delete it' 
      });
    }

    res.json({
      success: true,
      message: 'Skill deleted successfully'
    });

  } catch (error) {
    console.error('Delete skill error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
};

module.exports = deleteSkill;
