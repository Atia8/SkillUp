
import  DeleteReviewHandler from './deleteReviewHandler';
import { Link } from 'react-router-dom';
import { profileApi } from '../../api/profileApi';
import { Star,Trash2 } from 'lucide-react';
import { useState,useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

const ReviewCard = ({ reviewer,visitinguserId }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
const API_BASE= import.meta.env.VITE_API_URL; 
const ASSET_BASE_URL = API_BASE.replace('/api', ''); 
  const [Delete, setIsDelete] = useState(false);

  // Check if comment has more than 100 words
  //const words = reviewer.comment?.split(/\s+/) || [];
  const needsExpand = reviewer.comment?.length > 100;
  const displayComment = isExpanded 
  ? reviewer.comment 
  : (needsExpand ? reviewer.comment.slice(0, 66) + '...' : reviewer.comment);
  // Truncate to 100 words if not expanded
//   const displayComment = isExpanded 
//     ? reviewer.comment 
//     : (needsExpand ? words.slice(0, 100).join(' ') + '...' : reviewer.comment);


const { data: user = null, isLoading:loading, error } = useQuery({
    queryKey: ['currentUser'], // Same key as Navbar
    queryFn: () => profileApi.getCurrentUser() // Same function
  });


  const isReviewOwner = user?.id === reviewer.reviewerId;
 
  console.log('reviewer',reviewer.reviewerId);

console.log('reviewee',visitinguserId);

  return (
    <div className={`border border-gray-300 p-3 rounded-lg shadow shadow-gray-100 flex w-full lg:max-w-2xl mx-auto min-w-0 ${isExpanded ? '' : 'h-[160px] overflow-hidden'}`}>
       <Link to={`/users/${reviewer.reviewerId}`} className="block cursor-pointer">
      
      <div className="relative w-11 h-11 bg-gray-200 rounded-full flex items-center justify-center text-3xl sm:self-start flex-shrink-0">
        {reviewer.reviewerAvatar ? (
          <img 
            src={`${ASSET_BASE_URL}${reviewer.reviewerAvatar}`} 
            alt="Profile" 
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <svg 
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
      </Link>
      
      <div className="sm:mt-1 w-full pl-2 flex flex-col gap-1 min-w-0">
        <div className="flex justify-between ">
        <h4 className="font-semibold">{reviewer.reviewerName}</h4>
        <div className="mt-1">
        {isReviewOwner && (
            <button 
              onClick={() => setIsDelete(true)}
              className="text-black hover:text-gray-400 text-sm font-semibold mt-0 mb-1"
            >
             <Trash2 size={12} />
            </button>
          )}
    

{Delete && (
      <DeleteReviewHandler
        reviewer={reviewer}
        onComplete={() => setIsDelete(false)}
        onClose={() => setIsDelete(false)}
        visitinguserId={visitinguserId}
      />
    )}
    </div>
        </div>
        <div className="flex gap-1 items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star 
              key={star} 
              size={15}
              className={star <= reviewer.rating ? "text-yellow-500" : "text-gray-300"}
              fill={star <= reviewer.rating ? "currentColor" : "none"}
            />
          ))}
          <h3 className="text-gray-400 pl-0 text-sm">{reviewer.displayDate}</h3>
        </div>
        
        <div className="w-full min-w-0 ">
          <p className="break-words whitespace-normal">
            {displayComment}
          </p>
          
          {needsExpand && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-black hover:text-gray-400 text-sm font-semibold mt-2 mb-1.5"
            >
              {isExpanded ? 'See less' : 'See more'}
            </button>
          )}
        </div>
      </div>
    

    </div>
  );
};

export default ReviewCard;