// src/pages/Profile.jsx
import React from 'react';
//import Navbar from '../components/navigation/Navbar';
import ProfileHeader from '../components/profile/ProfileHeader';
import Navbar from '../components/navigation/ResponsiveNavbar';
import ReviewSection from '../components/reviews/ReviewsSection';
import AnotherSection from '../components/reviews/AnotherSection';
import SkillSection from '../components/skill/skillsection';
import WishSection from '../components/wish/wishSection';

import { useState, useEffect } from 'react'; 

const Profile = () => {

const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

 const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
      
    

        const response = await fetch('http://localhost:5000/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData); // Real data from backend!
        } else {
          console.error('Failed to fetch profile');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

 useEffect(() => {
    fetchUserProfile();
  }, []);

    // Function to handle profile updates
  const handleUserUpdate = async () => {
    await fetchUserProfile(); // Refresh data from server
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Failed to load profile</div>;
  }
 
console.log('User id:', user.id);
  return (
    <div className="min-h-screen bg-white w-full">
      <Navbar />
      {/* <div className="mx-auto px-4 py-8 max-w-7xl"> */}
         {/* <div className="container mx-auto py-6 sm:px-6 lg:px-8 w-full"> */}

         {/* Main Grid Container */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 px-4 py-8 max-w-7xl mx-auto"> */}
  
 <div className="mx-auto max-w-4xl md:max-w-6xl w-full px-4 py-3">
          <div className="w-full px-1 py-6"> 
        <ProfileHeader 
        user={user}
        onUserUpdate={handleUserUpdate} 
         />
      </div>
     
<div className="sm:columns-2 gap-2">
  {/* <div className="break-inside-avoid mb-4"> */}
    <div className="border border-gray-300 rounded-xl p-0 mb-4">
         <ReviewSection 
            user={user}
              isOwnAccount={true}
           />
    {/* </div> */}
  </div>
  <div className="break-inside-avoid mb-4">
    <div className="border border-gray-300 rounded-xl p-0">
     <SkillSection
            userId={user.id}
            isOwnAccount={true}
            />

    </div>
  </div>
  <div className="break-inside-avoid mb-4">
    <div className="border border-gray-300 rounded-xl p-0">
      <WishSection
            userId={user.id}
            isOwnAccount={true}
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

export default Profile;