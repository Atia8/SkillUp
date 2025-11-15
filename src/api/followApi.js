//const API_BASE = 'http://localhost:5000/api';
const API_BASE= import.meta.env.VITE_API_URL; // ← USE THIS

export const followUser = async (userId) => {
   
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE}/follow/${userId}`, {
         
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }

    });
     return response.json();

};

export const checkFollowStatus = async (targetUserId) => {
  const token = localStorage.getItem('token');
  
  const response = await fetch(`${API_BASE}/follow/status/${targetUserId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  
  const data = await response.json();
  console.log('Follow status:', data);
  return data;
};

export const unfollowUser = async (userId) => {
const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE}/follow/${userId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to unfollow user');
  }
  
  return response.json();

}; 

export const getFollowCount = async (userId) => {

 const response = await fetch(`${API_BASE}/follow/count/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to get follow stats');
  }
  
  const data = await response.json();
  return data;

};

