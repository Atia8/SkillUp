// const API_BASE= import.meta.env.VITE_API_URL; // ← USE THIS

// export const getChatHistory = async (otherUserId) => {
//   const token = localStorage.getItem('token');
//    console.log('🌐 API Request Starting...', {
//     url: `${API_BASE}/messages/${otherUserId}`,
//     method: 'GET',
//     hasToken: !!token,
//     otherUserId
//   });

//   const response = await fetch(
//     `${API_BASE}/messages/${otherUserId}`, {
//     headers: {
//       'Authorization': `Bearer ${token}`,
//     },
//   });
  
//   if (!response.ok) {
//     throw new Error('Failed to fetch chat history');
//   }
  
//   return response.json();
// };

// frontend/api/messageApi.js
const API_BASE = import.meta.env.VITE_API_URL;

export const getChatHistory = async (otherUserId) => {
  const token = localStorage.getItem('token');
  

  try {
    const response = await fetch(
      `${API_BASE}/messages/${otherUserId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: Failed to fetch chat history`);
    }
    
    // Your backend returns the array directly, not wrapped in an object
    const messages = await response.json();
    
    return messages; // Return the array directly
    
  } catch (error) {
    console.error('API Call Failed:', error);
    throw error;
  }
};

export const getChatList = async () => {
  const token = localStorage.getItem('token');
  
  console.log('🌐 Fetching chat list...');

  try {
    const response = await fetch(`${API_BASE}/messages/list/conversations`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    console.log('📡 Chat list response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Chat list API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      throw new Error(`Failed to fetch chat list: ${response.status} ${response.statusText}`);
    }
    
    const conversations = await response.json();
    console.log('✅ Chat list loaded successfully:', conversations.length, 'conversations');
    return conversations;
    
  } catch (error) {
    console.error('💥 Chat list fetch failed:', error);
    throw error;
  }
};
