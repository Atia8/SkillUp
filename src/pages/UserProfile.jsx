// src/pages/UserProfile.jsx
import React from 'react';
import ProfileHeader from '../components/profile/ProfileHeader';
import Navbar from '../components/navigation/ResponsiveNavbar';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}/profile`);
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        console.error('Failed to fetch user profile');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="min-h-screen bg-white w-full">
      <Navbar />
      <div className="w-full px-4 py-8">
        <ProfileHeader 
          user={user}
          onUserUpdate={fetchUserProfile}
          isOwnProfile={false} // 👈 This hides the edit button
        />
      </div>
    </div>
  );
};

export default UserProfile;