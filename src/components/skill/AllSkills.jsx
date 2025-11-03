


import { ArrowLeft } from 'lucide-react';
import Navbar from '../navigation/ResponsiveNavbar';
import SkillCard from './SkillCard';
import { useEffect } from 'react';

const AllSkills = ({ skills, isOwnAccount, userId, onBack }) => {
  
    useEffect(() => {
    // Hide scroll on body when component mounts
    document.body.style.overflow = 'hidden';
    
    // Restore scroll when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  
  
  
  
  return (
    <div className="fixed inset-0 bg-white z-50  overflow-y-auto">
      {/* Header - Fixed height */}
      <div className=""> 
        <div className="mb-5">
          <Navbar />
        </div>
        
        <div className="mx-auto px-5 mt-2 mb-0">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-medium"
          >
            <ArrowLeft size={20} />
          </button>
        </div>
       </div>

      {/* Content - Only scrolls when content overflows */}
      <div className="flex-1 min-h-0 ">
        <div className="h-full">
          <div className="p-2">
            <div className="border border-gray-300 px-6 py-8 bg-white rounded-xl max-w-2xl w-full mx-auto">
              <div className="grid grid-cols-1 gap-4 w-full">
                {skills.map(skill => (
                  <SkillCard 
                    key={skill.id}
                    skill={skill}
                    isOwnAccount={isOwnAccount}
                  />
                ))}
              </div>
              
              {skills.length === 0 && (
                <div className="text-center py-20">
                  <div className="text-gray-400 text-6xl mb-4">💼</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No skills yet</h3>
                  <p className="text-gray-600">Start by adding your first skill</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllSkills;