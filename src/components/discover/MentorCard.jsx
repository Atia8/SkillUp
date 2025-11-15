import { Star,UserPlus, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import FollowButton from '../profile/FollowButton'; // Adjust path as needed
import { useNavigate } from 'react-router-dom';


const MentorCard = ({ mentor }) => {

  // YOUR EXACT LOGIC:
  const filledStars = Math.floor(mentor.rating);  // 4.8 → 4
  const emptyStars = 5 - filledStars;             // 5 - 4 = 1

const API_BASE= import.meta.env.VITE_API_URL; 
const ASSET_BASE_URL = API_BASE.replace('/api', ''); 

 const navigate = useNavigate();
  const handleMessageClick = () => {
  navigate(`/chat/${mentor.id}`, {
    state: { 
      receiverName: mentor.name,
      receiverAvatar: mentor.avatar_url,
      discoverPage: true  
    }
  });
};

  return (
    //  <Link to={`/users/${mentor.id}`} className="block">
    <div className="bg-white rounded-2xl border border-gray-300 p-6 hover:shadow-md transition-shadow">
     <Link to={`/users/${mentor.id}`} className="block cursor-pointer">

      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-xl">
          {/* {mentor.avatar} */}
           {mentor.avatar_url? (
            <img 
              src={`${ASSET_BASE_URL}${mentor.avatar_url}`} 
              alt={mentor.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <svg 
              width="24" 
              height="24" 
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
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{mentor.name}</h3>

          <div className="flex items-center gap-1 text-sm text-gray-600">
            {/* Filled stars */}
            {Array.from({ length: filledStars }).map((_, i) => (
              <Star key={i} size={14} fill="currentColor" className="text-yellow-300" />
            ))}
            {/* Empty stars */}
            {Array.from({ length: emptyStars }).map((_, i) => (
              <Star key={i + filledStars} size={14} className="text-gray-300" />
            ))}
            
            
            {/* <span>⭐ {mentor.rating}</span>
            <span>•</span> */}

            <span>{mentor.rating} </span>

            <span>({mentor.reviewCount})</span>
            
          </div>
        </div>
      </div>
      
      
    
      <div className=" text-sm text-gray-600 mb-2 font-sans">
      {mentor.title}
      </div>

<div className="flex flex-wrap gap-2 mb-4">
    {mentor.skills.slice(0,3).map(skill => (
      <div 
      key={skill.id} 
      className="gap-1 flex items-center font-semibold bg-gray-100 text-black px-2 py-0.5 rounded-xl text-sm  border border-gray-300"
    >
      {skill.skill_name}
    </div>

 ))}
    </div>
    

 </Link> 
     

        <div className="grid grid-cols-2 gap-2 w-full">
  <FollowButton userId={mentor.id} />
  <button 
  onClick={handleMessageClick}
  className="flex items-center justify-center border border-gray-300 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-50">
    <MessageCircle size={18} />
    Message
  </button>
</div>
        
      </div>
     
  );
};

export default MentorCard;