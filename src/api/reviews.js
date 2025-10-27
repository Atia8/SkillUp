// This file contains all review-related API calls
export const fetchUserReviews = async (userId) => {
  const response = await fetch(`http://localhost:5000/api/reviews/user/${userId}`);
  if (!response.ok) throw new Error('Failed to fetch reviews');
  return response.json();
};

export const submitReview = async (reviewData) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`http://localhost:5000/api/reviews/${reviewData.userId}`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(reviewData)
  });

  if (!response.ok) throw new Error('Failed to submit review');
  
  return response.json();
};