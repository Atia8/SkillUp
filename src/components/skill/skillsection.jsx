import { PlusIcon} from 'lucide-react';
import { useState } from 'react';
import AddSkillModal from './SkillModal'; // Adjust path as needed
import { useQuery } from '@tanstack/react-query';
import { getUserSkills } from '../../api/skillsApi';
import SkillCard from './SkillCard';
import AllSkills from './AllSkills';

const SkillSection = ({ userId, isOwnAccount }) => {
const [isAddSkillModalOpen, setIsAddSkillModalOpen] = useState(false);
 const [showAllSkills, setShowAllSkills] = useState(false);

  const { data: skillsData, isLoading, error, refetch } = useQuery({
    queryKey: ['userSkills', userId],
    queryFn: () => getUserSkills(userId),
    enabled: !!userId,
  });


const handleAddSkillClick = () => {
    setIsAddSkillModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddSkillModalOpen(false);
  };

    const handleViewAllSkills = () => {
    setShowAllSkills(true);
  };

   const handleBackFromAllSkills = () => {
  setShowAllSkills(false);
};

  // Add this function
  const handleSkillAdded = () => {
      refetch();
    // This will trigger React Query to refetch skills
    console.log('Skill added - should refresh!');
  };

   const skills = skillsData?.skills || [];

  if (showAllSkills) {
    return (
      <AllSkills 
        skills={skills}
        isOwnAccount={isOwnAccount}
        //onBack={handleBackToSummary}
        userId={userId}
         onBack={handleBackFromAllSkills} 
      />
    );
  }

 return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Skill Section</h3>
      </div>

      {isLoading && <div>Loading skills...</div>}
      {error && <div>Error loading skills</div>}
       {!isLoading && !error && skills.length === 0 && (
        <div className="text-gray-500 text-center py-4">No skills added yet</div>
      )}

       {!isLoading && !error && skills.length > 0 && (
  
          <div className="grid grid-cols-1 gap-4 mb-2">
    {skills.slice(0,2).map(skill => (
      <SkillCard 
        key={skill.id}
        skill={skill}
        isOwnAccount={isOwnAccount}
        onAddCertificate={(skillId) => {
          console.log('Add certificate to skill:', skillId);
          // TODO: Open certificate upload modal for this skill
        }}
        onAddProject={(skillId) => {
          console.log('Add project to skill:', skillId);
          // TODO: Open project links modal for this skill
        }}
      />
    ))}
  </div>
      )}
     <div className="flex gap-4 justify-center">
      {isOwnAccount && (
      <button
        onClick={handleAddSkillClick}
         className="justify-center flex-1 mt-2 flex items-center gap-2 bg-black hover:bg-gray-300 text-white px-4 py-2 rounded-lg font-medium transition-colors"
       >
        <PlusIcon size={18} />
        Add skills
      </button>
       )}
       {skills.length > 0 && (
      <button 
      onClick={handleViewAllSkills}
      className="justify-center flex-1 border border-black mt-2 flex items-center gap-2 bg-white hover:bg-gray-300 text-blck px-4 py-2 rounded-lg font-medium transition-colors">
          View All Skills

      </button>
       )}
      </div>
         {/* Modal */}
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
export default SkillSection;
