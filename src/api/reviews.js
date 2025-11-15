const API_BASE= import.meta.env.VITE_API_URL; // ← USE THIS



// This file contains all review-related API calls
export const fetchUserReviews = async (userId) => {
  const response = await fetch(`${API_BASE}/reviews/user/${userId}`);
  if (!response.ok) throw new Error('Failed to fetch reviews');
  return response.json();
};

export const submitReview = async (reviewData) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE}/reviews/${reviewData.userId}`, {
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

export const deleteReview= async (reviewerId) => {
    const token = localStorage.getItem('token');
    console.log('reviewrId:',reviewerId);
    const response = await fetch(`${API_BASE}/reviews/delete/${reviewerId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to delete review');
    }
    
    return response.json();
};