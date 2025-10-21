import { useState, useEffect } from 'react';

const EditForm = ({ user, onSave, onCancel }) => {
   const [formData, setFormData] = useState({
    title: '',
    bio: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        title: user.title || '',
        bio: user.bio || ''
      });
    }
  }, [user]);

  const handleSave = async () => {
    
      if (formData.title.length > 100) {
      setError('Title must be 100 characters or less');
      return;
    }
    
    if (formData.bio.length > 500) { // Optional: Add bio limit too
      setError('Bio must be 500 characters or less');
      return;
    }
    
    setLoading(true);
     setError(''); // Clear previous errors
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/users/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const updatedUser = await response.json(); // Get the updated data from server
      onSave(); 
        //onSave(formData);
      } else {
        alert('Failed to update profile');
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 bg-white z-50 p-2">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-auto mt-15 p-6 border border-gray-200 shadow shadow-gray-100">
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>


       {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

       <div className="mb-6">
  < label className="block text-balance font-semibold text-gray-900 mb-2">
    Title
  </label>
        <input
    type="text"
     value={formData.title}
      onChange={(e) => {
        setFormData({...formData, title: e.target.value});
        setError('');
      }}
    className="w-full px-3 py-2 border border-gray-300 rounded text-sm  focus:border-black"
    placeholder="e.g. Senior Developer at Tech Company"
  />
       </div>
        
<div className="mb-6">
  < label className="block text-balance font-semibold text-gray-900 mb-2">
    Bio
  </label>
        <textarea
         value={formData.bio}
            onChange={(e) => {
              setFormData({...formData, bio: e.target.value});
               setError(''); // 👈 Clear error when user starts typing
            }}
    className="w-full px-3 py-2 border border-gray-300 rounded text-sm  focus:border-black resize-none"
    placeholder="Describe your experience, skills, and background..."
     rows="5"
  />
       </div>


        <div className="flex gap-3 mt-6">
          <button 
           onClick={handleSave} 
            //onClick={onSave}
            className=" bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Save 
          </button>
          <button 
            onClick={onCancel}
            className="border border-gray-400 px-6 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditForm;