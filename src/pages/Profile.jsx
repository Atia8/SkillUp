// src/pages/Profile.jsx
import React from 'react';
//import Navbar from '../components/navigation/Navbar';
import ProfileHeader from '../components/profile/ProfileHeader';
import Navbar from '../components/navigation/ResponsiveNavbar';

const Profile = () => {
  // Mock data for development
  const mockUser = {
    name: "John Doe",
    title: "Senior Frontend Developer",
    bio: "Passionate about React and teaching. 5+ years of experience building web applications.",
    avatar: "👨‍💻",
    rating: 4.8,
    reviewCount: 42,
    followerCount: 128,
    followingCount: 56
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <ProfileHeader user={mockUser} />
        {/* We'll add other sections here later */}
      </div>
    </div>
  );
};

export default Profile;