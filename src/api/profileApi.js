const API_BASE = import.meta.env.VITE_API_URL;

export const profileApi = {
  // Get current user profile
  getCurrentUser: async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE}/users/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }
    return response.json();
  }
};
