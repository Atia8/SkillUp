import React from 'react';
import Navbar from '../components/navigation/Navbar';
import ProfileHeader from '../components/profile/ProfileHeader';

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <ProfileHeader />
      </div>
    </div>
  );
};

export default Profile;