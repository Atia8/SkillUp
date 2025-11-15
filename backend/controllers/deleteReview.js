const { pool } = require('../config/database');

const deleteReview = async (req, res) => {
try{

     const reviewer_id = req.user.id;
     const reviewee_id = req.params.userId;

     const deleteQuery=
      `DELETE FROM reviews 
      WHERE reviewer_id = ? AND reviewee_id = ?`;
     
     const [result]=await pool.execute(deleteQuery,[reviewer_id,reviewee_id]);
     
      console.log('🗑️ Database result:', result);
    console.log('📊 Affected rows:', result.affectedRows);

    // Check if any row was actually deleted
    if (result.affectedRows === 0) {
      console.log('❌ No review found to delete');
      return res.status(404).json({ 
        success: false,
        error: 'Review not found or already deleted' 
      });
    }

    console.log('✅ Review deleted successfully');
    
     res.json({ 
      success:true,
      message: 'Review deleted successfully',
      deletedReviewId: reviewer_id 
    });
     
}
catch(error){
   console.error('Error deleting review:', error);
    res.status(500).json({ error: 'Failed to delete review' });
}




};
module.exports = {
  deleteReview
};