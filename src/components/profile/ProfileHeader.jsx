import { Star, Edit } from 'lucide-react';

const ProfileHeader = ({ user }) => {
  const { name, title, bio, avatar, rating, reviewCount, followerCount, followingCount } = user;
  
  const filledStars = Math.floor(rating);
  const emptyStars = 5 - filledStars;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8 mb-6 relative ">
      {/* Edit Button */}
      <button className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600">
        <Edit size={20} />
      </button>

      {/* Main Profile Row */}
      <div className="flex items-start gap-6 mb-6">
        {/* Avatar */}
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-3xl">
          {avatar}
        </div>
        
        {/* Name & Title */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{name}</h1>
          <p className="text-xl text-gray-600 mb-3">{title}</p>
          <p className="text-gray-600">{bio}</p>
        </div>
      </div>

      {/* Rating & Reviews Row */}
      <div className="flex items-center gap-4 mb-4">
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
        <span className="text-gray-500">•</span>
        <span className="text-lg text-gray-600">{reviewCount} reviews</span>
      </div>

      {/* Follow Stats Row */}
      <div className="flex items-center gap-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{followerCount}</div>
          <div className="text-sm text-gray-500">Followers</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{followingCount}</div>
          <div className="text-sm text-gray-500">Following</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;