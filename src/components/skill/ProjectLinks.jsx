import { useState } from 'react';



const ProjectLinks = ({ onLinksChange }) => {
  // You'll need state for:
  // - githubUrl
  // - youtubeUrl
  const [githubUrl, setGithubUrl] = useState('');
const [youtubeUrl, setYoutubeUrl] = useState('');


  return (
    <div className="mb-6">
           <label className="block text-sm font-medium text-gray-700 mb-3">
      Project Links (Optional)
    </label>
      {/* GitHub Input */}
      <div className="mb-3">
        <label className="block text-sm text-gray-600 mb-1">
        GitHub Repository Link
      </label>
        <input
        type="url"
        value={githubUrl}
        onChange={(e) =>{
           const newGithubUrl = e.target.value;
  setGithubUrl(newGithubUrl);
  // Send both URLs to parent
  onLinksChange({
    githubUrl: newGithubUrl,
    youtubeUrl: youtubeUrl
  });
        
        }}
        placeholder="https://github.com/username/repo"
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      </div>
       
       {/* YouTube Input */}
        <div>
      <label className="block text-sm text-gray-600 mb-1">
        YouTube Demo
      </label>
      <input
        type="url"
        value={youtubeUrl}
        onChange={(e) => {
            const newYoutubeUrl = e.target.value;
  setYoutubeUrl(newYoutubeUrl);
  // Send both URLs to parent
  onLinksChange({
    githubUrl: githubUrl,
    youtubeUrl: newYoutubeUrl
  });
           
        }}
        placeholder="https://youtube.com/watch?v=..."
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
    </div>
  );
};

export default ProjectLinks;