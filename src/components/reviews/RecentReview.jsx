
import { Star } from 'lucide-react';
import { useState,} from 'react';

const RecentReview = ({ reviewer }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
 
  const needsExpand = reviewer.comment?.length > 100;
  const displayComment = isExpanded 
  ? reviewer.comment 
  : (needsExpand ? reviewer.comment.slice(0, 25) + '...' : reviewer.comment);
  
  return (
    <div className={` p-2 flex w-full lg:max-w-2xl mx-auto min-w-0`}>
      <div className="relative w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-3xl sm:self-start flex-shrink-0">
        {reviewer.reviewerAvatar ? (
          <img 
            src={`http://localhost:5000${reviewer.reviewerAvatar}`} 
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
      
      <div className="sm:mt-1 w-full pl-2 flex flex-col min-w-0">
        <h4 className="font-semibold">{reviewer.reviewerName}</h4>
        <div className="flex gap-1 items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star 
              key={star} 
              size={15}
              className={star <= reviewer.rating ? "text-yellow-500" : "text-gray-300"}
              fill={star <= reviewer.rating ? "currentColor" : "none"}
            />
          ))}
          <h4 className="text-gray-400 pl-1.5 text-sm">{reviewer.displayDate}</h4>
        </div>
        
        <div className="w-full min-w-0 mt-1">
          <p className="break-words whitespace-normal text-gray-700">
            {displayComment}
          </p>
          
          {needsExpand && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-black hover:text-gray-400 text-sm font-semibold mt-0 mb-1"
            >
              {isExpanded ? 'See less' : 'See more'}
            </button>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default RecentReview;