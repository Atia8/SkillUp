 import { PlusIcon,Heart} from 'lucide-react';
// import { useState } from 'react';
// import AddSkillModal from './SkillModal'; // Adjust path as needed
// import { useQuery } from '@tanstack/react-query';
// import { getUserSkills } from '../../api/skillsApi';
// import SkillCard from './SkillCard';
// import AllSkills from './AllSkills';

const WishSection = ({ userId, isOwnAccount }) => {

 return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      {/* Header */}
      <div className="mb-4 flex gap-2 items-center">
        <Heart size={18} className="text-red-500"/>
        <h3 className="text-lg font-sans text-gray-900">Skills Wishlist</h3>
        
      </div>
  <div className="text-gray-500 text-center py-4">No skills added yet</div>
     
    </div>
  );


};
export default WishSection;
