// src/components/discover/SkillsSection.jsx
import React, { useState } from 'react';

const SkillsSection = () => {
  const [selectedSkills, setSelectedSkills] = useState([]);

  // Popular skills data - simple chip component react
  const popularSkills = [
    { id: 1, name: 'JavaScript' },
    { id: 2, name: 'React' },
    { id: 3, name: 'Node.js' },
    { id: 4, name: 'Python' },
    { id: 5, name: 'UI/UX Design' },
    { id: 6, name: 'Data Structures' },
    { id: 7, name: 'Algorithms' },
    { id: 8, name: 'SQL' },
    { id: 9, name: 'AWS' },
    { id: 10, name: 'Machine Learning' },
    { id: 11, name: 'Graphic Design' },
    { id: 12, name: 'Digital Marketing' },
    { id: 13, name: 'Java' },
    { id: 14, name: 'CSS' },
    { id: 15, name: 'HTML' },
    { id: 16, name: 'MongoDB' }
  ];

  const toggleSkill = (skillId) => {
    setSelectedSkills(prev =>
      prev.includes(skillId)
        ? prev.filter(id => id !== skillId)
        : [...prev, skillId]
    );
  };

  return (
    <div className="py-2 pl-2 sm:pl-0">
      {/* Section Header */}
      <div className="mb-4 pl-1 sm:pl-0">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Popular Skills
        </h2>
       
      </div>

      {/* Skills Tags - LeetCode Style */}
      <div className="flex flex-wrap gap-2">
        {popularSkills.map(skill => (
          <button
            key={skill.id}
            onClick={() => toggleSkill(skill.id)}
            className={`
              px-3 py-1 rounded-full border transition-all duration-200 text-sm font-medium cursor-pointer
              ${selectedSkills.includes(skill.id)
                ? 'bg-black text-white  hover:bg-gray-200'
                : 'bg-white border-gray-300 text-black hover:bg-gray-200'
              }
            `}
          >
            {skill.name}
          </button>
        ))}
      </div>

      {/* Selected Skills Indicator */}
      {selectedSkills.length > 0 && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-black">
            <span>Filtering by:</span>
            <div className="flex flex-wrap gap-1">
              {selectedSkills.map(skillId => {
                const skill = popularSkills.find(s => s.id === skillId);
                return (
                  <span
                    key={skillId}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-white text-black rounded-full text-sm font-semibold border border-gray-300"
                  >
                    {skill.name}
                    <button
                      onClick={() => toggleSkill(skillId)}
                      className="ml-1 hover:text-gray-500"
                    >
                      ×
                    </button>
                  </span>
                );
              })}
            </div>
            <button
              onClick={() => setSelectedSkills([])}
              className="ml-auto text-sm text-black hover:text-gray-600"
            >
              Clear all
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsSection;