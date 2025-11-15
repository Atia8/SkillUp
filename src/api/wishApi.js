//const API_BASE = 'http://localhost:5000/api';
const API_BASE= import.meta.env.VITE_API_URL; // ← USE THIS

export const addSkill = async (skillData) => {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${API_BASE}/wishlist`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
           
        },
        body: JSON.stringify(skillData)
    });
    
    return response.json();
};

// Public: Get any user's wishlist (no token needed)
export const getUserWishes = async (userId) => {
  const response = await fetch(`${API_BASE}/wishlist/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.json();
};

// api/wishApi.js
// export const removeFromWishlist = async (wishId) => {
//   const token = localStorage.getItem('token');
  
//   console.log(wishId);
//   const response = await fetch(`${API_BASE}/wishlist/${wishId}`, {
//     method: 'DELETE',
//     headers: {
//       'Authorization': `Bearer ${token}`,
//       'Content-Type': 'application/json',
//     }
//   });
//   console.log('📡 Response Status:', response.status);
//     console.log('📡 Response OK:', response.ok);
//      if (!response.ok) {
//       const errorText = await response.text();
//       console.error('❌ Server Error Response:', errorText);
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//   return response.json();
// };

export const removeFromWishlist = async (wishId) => {
  try {
    const token = localStorage.getItem('token');
    
    console.log('🔍 DELETE Wish Debug:');
    console.log('Wish ID:', wishId);
    console.log('Token exists:', !!token);
    console.log('Full URL:', `${API_BASE}/wishlist/${wishId}`);

    const response = await fetch(`${API_BASE}/wishlist/${wishId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    console.log('📡 Response Status:', response.status);
    console.log('📡 Response OK:', response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Server Error Response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('✅ Success Response:', result);
    return result;

  } catch (error) {
    console.error('💥 Network/Fetch Error:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    
    return {
      success: false,
      error: error.message
    };
  }
};