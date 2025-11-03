// src/components/skills/SkillDropdown.jsx
import Select from 'react-select';
import { popularSkills, customStyles } from './skillOptions';

const SkillDropdown = ({ selectedSkill, onSkillChange }) => {
  
  
  
    return (
    <div className="relative">
    <Select
      options={popularSkills}
      value={selectedSkill}
      onChange={onSkillChange}
      styles={customStyles}
      placeholder="Type to search skills..."
      isSearchable
      isClearable
      noOptionsMessage={({ inputValue }) => 
        inputValue ? `No skills found for "${inputValue}"` : 'No skills available'
      }
    />
      
    </div>
  );
};

export default SkillDropdown;