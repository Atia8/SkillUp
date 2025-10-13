import { Star,UserPlus, MessageCircle } from 'lucide-react';



const MentorCard = ({ mentor }) => {

  // YOUR EXACT LOGIC:
  const filledStars = Math.floor(mentor.rating);  // 4.8 → 4
  const emptyStars = 5 - filledStars;             // 5 - 4 = 1


  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-xl">
          {mentor.avatar}
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

            <span>({mentor.students})</span>
            
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {mentor.skills.map(skill => (
          <span key={skill} className="px-2 py-1 bg-gray-200 text-black rounded-full text-xs font-semibold">
            {skill}
          </span>
        ))}
      </div>
      
      <div className="flex gap-2">
        <button className="flex items-center justify-center gap-2 flex-1 bg-black text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-800">
           <UserPlus size={18} />
          Follow
        </button>
        <button className="flex items-center justify-center flex-1 border border-gray-300 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-50">
          <MessageCircle size={18} />
          Message
        </button>
      </div>
    </div>
  );
};

export default MentorCard;