// src/services/api.js
//const API_BASE_URL = 'http://localhost:5000/api';
const API_BASE_URL = import.meta.env.VITE_API_URL; // ← USE THIS
//const API_BASE_URL = 'http://192.168.139.26:5000/api';
console.log('🔍 VITE_API_URL:', import.meta.env.VITE_API_URL);
//const API_BASE_URL = import.meta.env.VITE_API_URL;

export const apiService = {
  async signup(userData) {
    console.log("📤 Sending to backend:", userData);
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const result = await response.json();
    console.log("📥 Backend response:", result);
    return result;
  },

  async login(credentials) {
  console.log("📤 Sending login to backend:", credentials);
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  const result = await response.json();
  console.log("📥 Backend login response:", result);
  
  // Save token if login successful
  if (result.success && result.token) {
    localStorage.setItem('authToken', result.token);
  }
  
  return result;
}
};