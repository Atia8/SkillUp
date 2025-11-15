// In your api/skillsApi.js or add to followApi.js
//const API_BASE = 'http://localhost:5000/api';
const API_BASE= import.meta.env.VITE_API_URL; // ← USE THIS



export const addSkill = async (skillData) => {
    const token = localStorage.getItem('token');
    
    const formData = new FormData();
    formData.append('skillName', skillData.skillName);
    if (skillData.githubUrl) formData.append('githubUrl', skillData.githubUrl);
    if (skillData.youtubeUrl) formData.append('youtubeUrl', skillData.youtubeUrl);
    if (skillData.certificateFile) formData.append('certificateFile', skillData.certificateFile);

    const response = await fetch(`${API_BASE}/skills`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            // Don't set Content-Type - browser will set it with boundary for FormData
        },
        body: formData
    });
    
    return response.json();
};

export const getUserSkills = async (userId) => {
   
  const token = localStorage.getItem('token');
    // console.log('Making API call to:', `${API_BASE}/skills/${userId}`);
    // console.log('Token exists:', !!token);

  const response = await fetch(`${API_BASE}/skills/${userId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
   const data = await response.json();
  //console.log('API Response:', data);
  return data;
  //return response.json();
};

// Delete skill - ADD THIS FUNCTION
export const deleteSkill = async (skillId) => {
    try {
        const token = localStorage.getItem('token');
        
        const response = await fetch(`${API_BASE}/skills/${skillId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        return await response.json();
    } catch (error) {
        console.error('Delete skill API error:', error);
        return { 
            success: false, 
            error: 'Network error while deleting skill' 
        };
    }
};