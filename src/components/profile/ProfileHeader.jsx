import { Star, Edit,UserPlus, MessageCircle,Camera } from 'lucide-react';
import { useRef,useState } from 'react';

const ProfileHeader = ({ user }) => {

    const fileInputRef = useRef(null); // Create ref
  const [profileImage, setProfileImage] = useState(null); // Add this line
  // 
       // 3. Function to handle camera click
  const handleCameraClick = () => {
    fileInputRef.current?.click(); // Trigger hidden file input
  };

  const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);
  }
};

  const { name, title, bio, avatar, rating, reviewCount, followerCount, followingCount } = user;
  
  const filledStars = Math.floor(rating);
  const emptyStars = 5 - filledStars;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 relative ">
      {/* Edit Button */}
      <button className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600">
        <Edit size={20} />
      </button>


  <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*" // Only allow images
         onChange={handleFileChange} // Add this
      />
      


      {/* Main Profile Row */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-6">
        {/* Avatar */}
        <div className="relative w-27 h-27 bg-gray-200 rounded-full flex items-center justify-center text-3xl sm:self-start">
          {/* {avatar} */}

          {profileImage ? (
  <img src={profileImage} alt="Profile" className="w-full h-full object-cover rounded-full" />
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
    <button
  
   onClick={handleCameraClick}
  
className="absolute bottom-0 right-0 w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center border-2 border-white">
    <Camera size={16} className="text-white" />
  </button>



        </div>
        
        
        {/* Name & Title */}
        <div className="text-center sm:text-left sm:mt-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{name}</h1>
          <p className="text-xl text-gray-600 mb-3">{title}</p>
          <p className="text-gray-600">{bio}</p>
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
          <div className="text-sm font-semibold text-gray-600">{followerCount} followers</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-semibold text-gray-600">{followingCount} following</div>
        </div>
      </div>

  <div className="flex items-center justify-center sm:justify-start gap-4 sm:self-start pt-5">
            <button className="flex justify-center items-center bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors gap-1">
            <UserPlus size={18} />
              Follow
            </button>
            <button className="flex justify-center items-center border border-gray-400 px-6 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors gap-1">
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