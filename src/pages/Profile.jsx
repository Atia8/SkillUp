// src/pages/Profile.jsx
import React from 'react';
//import Navbar from '../components/navigation/Navbar';
import ProfileHeader from '../components/profile/ProfileHeader';
import Navbar from '../components/navigation/ResponsiveNavbar';
import ReviewSection from '../components/reviews/ReviewsSection';
import AnotherSection from '../components/reviews/AnotherSection';

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
          <div className="w-full px-4 py-8"> {/* 👈 Full width */}
        <ProfileHeader 
        user={user}
        onUserUpdate={handleUserUpdate} 
         />
        {/* We'll add other sections here later */}
      </div>
      <div className="flex flex-col sm:flex-row gap-2 px-4 pt-2 mb-2">
           <div className="flex-1"><AnotherSection /></div>
           <div className="flex-1">
            <ReviewSection 
            user={user}
              isOwnAccount={true}
           />
           </div>
      </div>
    </div>
  );
};

export default Profile;