import { useState } from 'react';
import SkillDropdown from '../skill/SkillDropdown';
import { addSkill } from '../../api/wishApi';




const WishModal = ({ userId,isOpen, onClose, onSkillAdded }) => {

const [selectedSkill, setSelectedSkill] = useState(null);
  
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');

  const handleSubmit = async() => {
    if (!selectedSkill) {
      setError('Please select a skill');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const skillData= {
        skillName:selectedSkill.value
      };
    console.log(skillData.skillName);
      const result = await addSkill(skillData);
      
      if (result.success) {
        onSkillAdded(); // Refresh parent component
        console.log("skill is sent");
        onClose(); // Close modal
        // Reset form
        setSelectedSkill(null);
      } else {
        setError(result.error || 'Failed to add WishSkill');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };
  




return(
<div className="fixed inset-0 backdrop-blur-[2px] backdrop-brightness-75 flex items-center justify-center p-5 z-50 pt-10 ">
<div className="bg-white rounded-xl max-w-2xl w-full p-7 border border-gray-600 shadow shadow-lg">



 {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Add New Skill in your WishList</h2>
         
     {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
        {/* Step 1: Skill Selection Box */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Select Skill *
          </label>

          <SkillDropdown 
            selectedSkill={selectedSkill}
            onSkillChange={setSelectedSkill}
          />
           {/* Certificate Upload */}
        
        
          {/* <p className="text-xs text-gray-500 mt-2">
            Can't find your skill? We'll add custom skill option later
          </p> */}
        </div>


<div className="flex gap-3 mt-6">
          <button 
           onClick={handleSubmit} 
            className=" bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Submit
          </button>
          <button 
            onClick={onClose}
            className="border border-gray-400 px-6 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>


</div>
</div>
);
};
export default WishModal;
