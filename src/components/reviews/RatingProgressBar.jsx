// import { Star } from 'lucide-react';

// const RatingProgressBar = ({ rating, percentage, count }) => {
//   return (
//     <div className="flex items-center justify-between gap-4 py-2 w-full">
//       {/* Left: Star and rating */}
//       <div className="flex items-center gap-2 flex-shrink-0">
//         <span className="text-sm font-medium">{rating}</span>
//         <Star size={16} className="text-yellow-500" fill="currentColor" />
//       </div>
      
//       {/* Middle: Progress bar */}
//       <div className="rounded-full  border border-gray-200 px-30">
//         {/* <div 
//           className="bg-yellow-500 h-2 rounded-full transition-all duration-300" 
//           style={{ width: `${percentage}%` }}
//         /> */}
//         jj
//       </div>
      
//       {/* Right: Count */}
//       <div className=" text-right">
//         <span className="text-sm text-gray-600 font-medium">
//           {count}
//         </span>
//       </div>
//     </div>
//   );
// };

// export default RatingProgressBar;

import { Star } from 'lucide-react';

const RatingProgressBar = ({ rating, percentage, count }) => {
  return (
    <div className="flex items-center py-1 w-full">
      {/* Left: Star and rating */}
      <div className="flex items-center justify-center gap-2 w-10">
        <span className="text-sm font-sans">{rating}</span>
        <Star size={16} className="text-yellow-500" fill="currentColor" />
      </div>
      
      {/* Middle: Fixed width progress bar */}
      <div className="flex-1  bg-gray-300 rounded-full h-2 mx-3"> {/* Fixed width */}
        <div 
          className="bg-black h-2 rounded-full transition-all duration-300" 
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      {/* Right: Count */}
      <div className="w-3 justify-center">
        <span className="text-sm text-gray-600 font-sans">
          {count}
        </span>
      </div>
    </div>
  );
};

export default RatingProgressBar;