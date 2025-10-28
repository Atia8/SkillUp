const { pool } = require('../config/database');

// GET reviews for a specific user
const getReviewsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log('Fetching reviews for user:', userId);

    const query = `
      SELECT 
        r.id,
        r.rating,
        r.comment,
        r.created_at,
        r.updated_at,
        u.name as reviewer_name,
        up.avatar_url as reviewer_avatar
      FROM reviews r
      INNER JOIN users u ON r.reviewer_id = u.id
      LEFT JOIN user_profiles up ON r.reviewer_id = up.user_id
      WHERE r.reviewee_id = ?
      ORDER BY r.updated_at DESC
    `;

  const statsQuery = `
      SELECT 
        AVG(rating) as average_rating,
        COUNT(*) as total_reviews
      FROM reviews 
      WHERE reviewee_id = ?
    `;


     // NEW: Query to get rating distribution
    const distributionQuery = `
      SELECT 
        rating,
        COUNT(*) as count
      FROM reviews 
      WHERE reviewee_id = ?
      GROUP BY rating
      ORDER BY rating DESC
    `;

  //const [reviews] = await pool.execute(reviewsQuery, [userId]);
    const [stats] = await pool.execute(statsQuery, [userId]);
    const [reviews] = await pool.execute(query, [userId]);
    const [distribution] = await pool.execute(distributionQuery, [userId]);

   const averageRating = stats[0]?.average_rating || 0;
    const totalReviews = stats[0]?.total_reviews || 0;

  // NEW: Calculate rating distribution
    const ratingDistribution = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0
    };

    // Fill in the actual counts from the distribution query
    distribution.forEach(row => {
      ratingDistribution[row.rating] = row.count;
    });

    // Calculate percentages for each rating
    const ratingPercentages = {};
    for (let rating = 5; rating >= 1; rating--) {
      ratingPercentages[rating] = totalReviews > 0 
        ? Math.round((ratingDistribution[rating] / totalReviews) * 100)
        : 0;
    }

     if (!reviews || reviews.length === 0) {
      console.log(`No reviews found for user ${userId}`);
      return res.json([]); // Return empty array, not error
    }
  
    
    // Format the response
    const formattedReviews = reviews.map(review => ({
      id: review.id,
      rating: review.rating,
      comment: review.comment,
      reviewerName: review.reviewer_name,
      reviewerAvatar: review.reviewer_avatar,
      createdAt: review.created_at,
      updatedAt: review.updated_at,
      displayDate: review.created_at === review.updated_at 
        ? `Posted ${formatTimeAgo(review.created_at)}`
        : `Updated ${formatTimeAgo(review.updated_at)}`
    }));

    console.log(`Found ${formattedReviews.length} reviews for user ${userId}`);
      
    res.json({
      averageRating: parseFloat(averageRating).toFixed(1),
      totalReviews: totalReviews,
      ratingDistribution: ratingDistribution,    // NEW: Raw counts
      ratingPercentages: ratingPercentages,      // NEW: Percentage for each rating
      reviews: formattedReviews
    });
    
    //res.json(formattedReviews);

  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch reviews',
      error: error.message 
    });
  }
};

// Helper function for time ago display
const formatTimeAgo = (date) => {
 
  const now = new Date();
  const reviewDate = new Date(date);
  const diffInSeconds = Math.floor((now - reviewDate) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} second${diffInSeconds !== 1 ? 's' : ''} ago`;
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
  } else if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
  } else if (diffInWeeks < 4) {
    return `${diffInWeeks} week${diffInWeeks !== 1 ? 's' : ''} ago`;
  } else if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths !== 1 ? 's' : ''} ago`;
  } else {
    return `${diffInYears} year${diffInYears !== 1 ? 's' : ''} ago`;
  }
};

module.exports = {
  getReviewsByUser
};