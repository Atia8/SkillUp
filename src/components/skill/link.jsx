import { useState, useRef, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { addSkill } from '../../api/skillsApi';

const SimpleLinksButton = ({ skill }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [githubUrl, setGithubUrl] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const containerRef = useRef(null);
  const queryClient = useQueryClient();

  // Click outside to cancel
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsAdding(false);
        setGithubUrl('');
        setYoutubeUrl('');
      }
    };

    if (isAdding) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isAdding]);

  // Handle Enter key to save
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  const handleSave = async () => {
    // Only save if we have at least one URL
    if (githubUrl.trim() || youtubeUrl.trim()) {
      const skillData = {
        skillName: skill.skill_name,
        githubUrl: githubUrl,
        youtubeUrl: youtubeUrl
      };

      await addSkill(skillData);
      await queryClient.invalidateQueries(['userSkills']);
    }
    
    setIsAdding(false);
    setGithubUrl('');
    setYoutubeUrl('');
  };

  // If adding, show input fields
  if (isAdding) {
    return (
      <div ref={containerRef} className=" py-1 font-semibold w-full flex items-center justify-center gap-0 border border-gray-300 text-black px-0 rounded text-sm hover:bg-gray-200 transition-colors">
        <input
          type="url"
          placeholder="Add link"
          value={githubUrl}
          onChange={(e) => setGithubUrl(e.target.value)}
          onKeyDown={handleKeyPress}
          className="px-1 placeholder:text-center text-left w-full py-0.5 rounded text-sm border-none outline-none bg-transparent placeholder-gray-500"
          autoFocus // Cursor automatically in the box!
        />
        
      </div>
    );
  }

  // Normal state - show "Add Links" button
  return (
    <button 
      onClick={() => setIsAdding(true)}
      className=" py-1 font-semibold w-full flex items-center justify-center gap-0 border border-gray-300 text-black px-0 rounded text-sm hover:bg-gray-200 transition-colors"
    >
      <span>+</span>
      Add Links
    </button>
  );
};

export default SimpleLinksButton;