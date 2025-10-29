import { Star, Edit,UserPlus, MessageCircle,Camera } from 'lucide-react';
import { useRef,useState } from 'react';
import EditForm from './EditForm'; // Adjust path as needed
import FollowButton from './FollowButton'; // Adjust path as needed

import {getFollowCount} from '../../api/followApi'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const ProfileHeader = ({ user,onUserUpdate,isOwnProfile=true }) => {
 
   const { 
        data: countData, 
        isLoading: countLoading, 
        error: countError 
    } = useQuery({
        queryKey: ['followCount', user.id], // Unique key for this user's status
        queryFn: () => getFollowCount(user.id),
        enabled: !!user.id, // Only run if userId exists
    });

    const fileInputRef = useRef(null); // Create ref
    const [isUploading, setIsUploading] = useState(false);
    //const [isEditing, setIsEditing] = useState(false); // 👈 ADD THIS
    const [showEditForm, setShowEditForm] = useState(false);

    





       // 3. Function to handle camera click
  const handleCameraClick = () => {
    fileInputRef.current?.click(); // Trigger hidden file input
  };

  const handleFileChange = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

    try {
      setIsUploading(true);
      
      const formData = new FormData();
      formData.append('avatar', file);

      // Get token from wherever you store it (localStorage, context, etc.)
      const token = localStorage.getItem('token'); // or from your auth context

      const response = await fetch('http://localhost:5000/api/upload/avatar', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // 👈 Include JWT token
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        // Success - update the UI with new avatar
        console.log('Avatar uploaded:', result.avatarUrl);
        // You might want to update the user context or reload user data
         window.location.reload(); // Simple refresh for now
      } else {
        // Error handling
        console.error('Upload failed:', result.error);
        alert(`Upload failed: ${result.error}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload avatar');
    } finally {
      setIsUploading(false);
      // Reset file input
      event.target.value = '';
    }

  
};

  const { name, title, bio, avatar, rating, reviewCount, followerCount, followingCount } = user;
  
  const filledStars = Math.floor(rating);
  const emptyStars = 5 - filledStars;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 relative ">
      {/* Edit Button */}
       {/* {isOwnProfile && ( 
      <button 
      onClick={() => setShowEditForm(true)} 
      className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600">
        <Edit size={20} />
      </button>
       )} */}
      
      {showEditForm && (
    <EditForm 
      user={user}
         onSave={() => {
            // 3. Call parent's update function with new data
            onUserUpdate();
            setShowEditForm(false);
          }}
      onCancel={() => setShowEditForm(false)} // 👈 Close on cancel
    />
  )}

  <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*" // Only allow images
         onChange={handleFileChange} // Add this
          disabled={isUploading}
      />
      


      {/* Main Profile Row */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-6">
        {/* Avatar */}
        <div className="relative w-27 h-27 bg-gray-200 rounded-full flex items-center justify-center text-3xl sm:self-start">
          {/* {avatar} */}
  {/* Show current avatar or placeholder */}
          {user.avatar_url ? (
            <img 
              src={`http://localhost:5000${user.avatar_url}`} 
              alt="Profile" 
              className="w-full h-full rounded-full object-cover"
            />
) : (
          <svg 
    width="80" 
    height="60" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
    className="text-gray-500"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)}
{/* Camera Icon */}
 {isOwnProfile && (
    <button
   onClick={handleCameraClick}
  disabled={isUploading}
className="absolute bottom-0 right-0 w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center border-2 border-white
hover:bg-gray-600 disabled:opacity-50">
  {isUploading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
    <Camera size={16} className="text-white" />
            )}
  </button>
 )}


        </div>
        
        
        {/* Name & Title */}
        <div className="text-center sm:text-left sm:mt-1 w-full">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 break-words">{name}</h1>
          <p className="text-xl text-gray-600 mb-3 break-words">{title}</p>
          <p className="text-gray-600 break-words">{bio}</p>
            {/* Rating & Reviews Row */}
      <div className="flex items-center justify-center sm:items-start sm:justify-start  gap-2 mb-2 pt-3">
        <div className="flex items-center gap-2">
          {/* Stars */}
          <div className="flex gap-1">
            {Array.from({ length: filledStars }).map((_, i) => (
              <Star key={i} size={20} fill="currentColor" className="text-yellow-500" />
            ))}
            {Array.from({ length: emptyStars }).map((_, i) => (
              <Star key={i + filledStars} size={20} className="text-gray-300" />
            ))}
          </div>
          <span className="text-lg font-semibold text-gray-900">{rating}</span>
          
        </div>
        {/* <span className="text-gray-500">•</span> */}
        <span className="text-lg text-gray-600">({reviewCount} reviews)</span>
      </div>

 {/* followers & following*/}

 <div className="flex items-center justify-center sm:justify-start gap-6">
        <div className="text-center">
          <div className="text-sm font-semibold text-gray-600">{countData?.data?.followerCount || 0} followers</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-semibold text-gray-600">{countData?.data?.followingCount || 0} following</div>
        </div>
      </div>

  <div className="flex items-center justify-center sm:justify-start gap-4 sm:self-start pt-5">
            
            {isOwnProfile && (
            <button 
             onClick={() => setShowEditForm(true)}
            className="flex justify-center items-center bg-black text-white px-3 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors gap-1 whitespace-nowrap">
            <Edit size={18} />
              Edit Profile
            </button>
            )}

             {/* {!isOwnProfile && (
            <button 
             
            className="flex justify-center items-center bg-black text-white px-3 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors gap-1">
            <UserPlus size={18} />
              Follow
            </button>
            )} */}
           {!isOwnProfile && (
          <FollowButton 
            userId={user.id} 
            isOwnProfile={isOwnProfile} 
          />
        )}



            <button className="flex justify-center items-center border border-gray-400 px-3 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors gap-1">
                <MessageCircle size={18} />
              Message
            </button>
          </div>


        </div>
          
        
      </div>

     
    
   
    </div>
  );
};

export default ProfileHeader;