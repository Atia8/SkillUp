const { pool } = require('../config/database');
//const authMiddleware = require('../middleware/authMiddleware');


const createReview = async (req, res) => {
  try {
     const reviewer_id = req.user.id;
      const { rating, comment } = req.body;
        const reviewee_id = req.params.userId;
    
         const query = `
      INSERT INTO reviews (reviewer_id, reviewee_id, rating, comment, created_at, updated_at)
      VALUES (?, ?, ?, ?, NOW(), NOW())
      ON DUPLICATE KEY UPDATE 
        rating = VALUES(rating),
        comment = VALUES(comment),
        updated_at = NOW()
    `;

    const [result] = await pool.execute(query, [
      reviewer_id,
      reviewee_id,
      rating,
      comment
    ]);

    res.status(200).json({
      success: true,
      message: result.affectedRows === 1 ? 'Review created successfully' : 'Review updated successfully',
      data: {
        id: result.insertId || 'updated',
        reviewer_id,
        reviewee_id,
        rating,
        comment
      }
    });

  } catch (error) {
    // 7. Handle errors
       console.error('Create review error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create/update review',
      error: error.message
    });
  }
};

module.exports = {
  createReview
};