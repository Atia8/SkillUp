 import { PlusIcon,Heart,Trash2,X} from 'lucide-react';
 import { useState } from 'react';
 import AddSkillModal from './wishModal'; // Adjust path as needed
 import { useQuery } from '@tanstack/react-query';
// import { getUserSkills } from '../../api/skillsApi';
// import SkillCard from './SkillCard';
// import AllSkills from './AllSkills';
import { getUserWishes } from '../../api/wishApi';
import  DeleteSkillHandler from './deletewishHandle';

const WishSection = ({ userId, isOwnAccount }) => {

const [isAddSkillModalOpen, setIsAddSkillModalOpen] = useState(false);
 const [showAllSkills, setShowAllSkills] = useState(false);


  const { data: skillsData, isLoading, error, refetch } = useQuery({
    queryKey: ['wishSkills', userId],
    queryFn: () => getUserWishes(userId),
    enabled: !!userId,
  });

   const skills = skillsData?.wishes || [];

 const handleDeleteComplete = (result) => {
    if (!result) return; // No result, do nothing
  
  if (result.error) {
    alert(`Error: ${result.error}`);
  } else if (result.success) {
    console.log('Success:', result.message);
    // Optional: Show success toast/notification
  }
  };

  const handleAddSkillClick = () => {
    setIsAddSkillModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddSkillModalOpen(false);
  };
 
   const handleSkillAdded = () => {
      refetch();
    // This will trigger React Query to refetch skills
    console.log('Skill added - should refresh!');
  };

 return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      {/* Header */}
      <div className="mb-4 flex gap-2 items-center">
        <Heart size={22} className="text-red-500"/>
        <h3 className="text-lg font-sans text-gray-900">Skills Wishlist</h3>
        
      </div>

 {isLoading && <div>Loading skills...</div>}
      {error && <div>Error loading skills</div>}
       {!isLoading && !error && skills.length === 0 && (
        <div className="text-gray-500 text-center py-4">No skills is added in wishlist</div>
      )}
      
        {!isLoading && !error && skills.length > 0 && (
  
  
          <div className="flex flex-wrap gap-2">
    {skills.map(skill => (
      <div 
      key={skill.id} 
      className="gap-1 flex items-center font-semibold bg-white text-black px-2 py-1 rounded-xl text-sm  border border-gray-300"
    >
      {skill.wish_skill_name}

      {isOwnAccount && (
        <DeleteSkillHandler
          skill={skill}
          // queryClient={queryClient}
          onComplete={handleDeleteComplete}
        >
          {({ onClick, isDeleting }) => (
            <button 
              onClick={onClick}
              disabled={isDeleting}
              // className="flex items-center justify-center  text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
              className="flex items-center justify-center w-5 h-5 -mr-1 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
               title={`Delete ${skill.wish_skill_name}`}
            >
              {isDeleting ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <X size={12} />
              )}
            </button>
          )}
        </DeleteSkillHandler>
      )}
    </div>
     
     
    ))}

  

   

  </div>

      )}

     <div className="flex gap-4 justify-center">
      {isOwnAccount && (
      <button
        onClick={handleAddSkillClick}
         className="border border-black justify-center w-full mt-2 flex items-center gap-2 bg-white hover:bg-gray-300 text-black px-4 py-2 rounded-3xl font-medium transition-colors"
       >
        <PlusIcon size={18} />
        Add Wish
      </button>
       )}
       {/* {skills.length > 0 && (
      <button 
      onClick={handleViewAllSkills}
      className="justify-center flex-1 border border-black mt-2 flex items-center gap-2 bg-white hover:bg-gray-300 text-blck px-4 py-2 rounded-lg font-medium transition-colors">
          View All Skills

      </button> */}
       {/* )} */}
      </div>

 {isAddSkillModalOpen && (
        <AddSkillModal 
          isOpen={isAddSkillModalOpen}
          onClose={handleCloseModal}
          userId={userId}
            onSkillAdded={handleSkillAdded}
            
        />
      )}
    </div>
  );


};
export default WishSection;
