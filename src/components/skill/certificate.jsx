
import { addSkill } from '../../api/skillsApi';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Plus} from 'lucide-react';

const SimpleCertificateUpload = ({ skill }) => {
    const queryClient = useQueryClient();
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    
    try {
        //console.log('📁 Selected file:', file.name, file.size, file.type);
      // Prepare data exactly as your API expects
      const skillData = {
        skillName: skill.skill_name,
        certificateFile: file,
        // Preserve existing links so they don't get erased
        githubUrl: skill.project_github_url || '',
        youtubeUrl: skill.project_youtube_url || ''
      };

      console.log('Uploading certificate for:', skill.skill_name);
      
      const result = await addSkill(skillData);
      
      if (result.success) {
        console.log('✅ Certificate uploaded successfully!');
         if (result.success) {
      // Invalidate and refetch skills data
      await queryClient.invalidateQueries(['userSkills']);
    }
        // Optional: Refresh the parent component or show success message
      } else {
        console.error('❌ Upload failed:', result.error);
        alert('Failed to upload certificate: ' + result.error);
      }
    } catch (error) {
      console.error('❌ Upload error:', error);
      alert('Network error while uploading certificate');
    } finally {
      setUploading(false);
      // Reset the input to allow uploading same file again
      event.target.value = '';
    }
  };

  return (
    <label className={`border border-gray-300 not-odd:px-3 py-1 rounded text-sm cursor-pointer ${
      uploading 
        ? 'bg-gray-400 text-white' 
        : ' py-1 font-semibold w-full flex items-center justify-center gap-0 border border-gray-300 text-black px-0 rounded text-sm hover:bg-gray-200 transition-colors'
    }`}>

         
    {uploading ? (
      'Uploading...'
    ) : (
      <>
        <Plus size={16} /> {/* Add your + icon here */}
        Add Certificate
      </>
    )}
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileUpload}
        disabled={uploading}
        className="hidden"
      />
    </label>
  );
};

export default SimpleCertificateUpload;