// src/pages/UserProfile.jsx
import React from 'react';
import ProfileHeader from '../components/profile/ProfileHeader';
import Navbar from '../components/navigation/ResponsiveNavbar';
import ReviewSection from '../components/reviews/ReviewsSection';
import AnotherSection from '../components/reviews/AnotherSection';
import SkillSection from '../components/skill/skillsection';
import WishSection from '../components/wish/wishSection';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

  const API_BASE= import.meta.env.VITE_API_URL;
const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`${API_BASE}/users/${userId}/profile`);
      
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
      <div className="mx-auto max-w-4xl md:max-w-6xl w-full px-4 py-3">
      <div className="w-full px-1 py-6">
        <ProfileHeader 
          user={user}
          onUserUpdate={fetchUserProfile}
          isOwnProfile={false} // 👈 This hides the edit button
        />
        </div>
       
<div className="sm:columns-2 gap-2">
  <div className="break-inside-avoid mb-4">
    <div className="border border-gray-300 rounded-xl p-0 mb-4">
         <ReviewSection 
            user={user}
              isOwnAccount={false}
           />
    </div>
  </div>
  <div className="break-inside-avoid mb-4">
    <div className="border border-gray-300 rounded-xl p-0">
     <SkillSection
            userId={user.id}
            isOwnAccount={false}
            />

    </div>
  </div>
  <div className="break-inside-avoid mb-4">
    <div className="border border-gray-300 rounded-xl p-0">
      <WishSection
            userId={user.id}
            isOwnAccount={false}
            />

    </div>
  </div>
  <div className="break-inside-avoid mb-4">
    <div className="border border-gray-300 rounded-lg p-4">Section 4 - Short</div>
  </div>
</div>



      </div>
      

    </div>
  );
};

export default UserProfile;