import { FileText, GitBranch, Plus,Medal,Award, ExternalLink,Trash2} from 'lucide-react';
import SimpleCertificateUpload from './certificate'
import SimpleLinksButton from './link'
import  DeleteSkillHandler from './deleteSkillhandles';
import { useQueryClient } from '@tanstack/react-query';

// components/skills/SkillCard.jsx
const SkillCard = ({ skill, isOwnAccount, onAddCertificate, onAddProject }) => {
   const queryClient = useQueryClient();

  // const handleDelete = async () => {
  //   const result = await handleDeleteSkill(skill.id, skill.skill_name, queryClient);
    
  //   if (result && !result.success && !result.cancelled) {
  //     alert(result.error);
  //   }
  // };

   const handleDeleteComplete = (result) => {
    if (result && !result.success && !result.cancelled) {
      alert(result.error);
    }
  };
 
 
  return (
    <div className=" w-full border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
      {/* Skill Name */}
      <div className="flex justify-between">
      <h3 className="pl-2 text-base font-semibold text-black mb-1">
        {skill.skill_name}
      </h3>
       
          
      {isOwnAccount && (
        <DeleteSkillHandler
          skill={skill}
          queryClient={queryClient}
          onComplete={handleDeleteComplete}
        >
          {({ onClick, isDeleting }) => (
            <button 
              onClick={onClick}
              disabled={isDeleting}
              className="text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
               title={`Delete ${skill.skill_name}`}
            >
              {isDeleting ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Trash2 size={16} />
              )}
            </button>
          )}
        </DeleteSkillHandler>
      )}

      </div>
      {/* Action Buttons */}
      <div className="flex justify-between gap-5 ">
        {/* Certificate Button */}
        {skill.certificate_url ? (
          <button
            onClick={() => window.open(skill.certificate_url, '_blank')}
            className="cursor-pointer justify-center py-1 font-semibold  w-full flex items-center gap-2 bg-white text-black px-2 rounded text-sm hover:bg-gray-300 transition-colors border border-gray-300"
          >
            <Award size={16} />
            Certificate
          </button>
        ) : isOwnAccount ? (
           <SimpleCertificateUpload skill={skill} />
         
        ) : null}

        {/* Project Button */}
        {skill.project_github_url || skill.project_youtube_url ? (
          
     <a
    href={skill.project_github_url || skill.project_youtube_url}
    target="_blank"
    rel="noopener noreferrer"
    className="cursor-pointer justify-center font-semibold w-full flex items-center gap-2 bg-white text-black px-2 rounded text-sm hover:bg-gray-300 transition-colors border border-gray-300"
  >
    <ExternalLink size={16} />
    Project
  </a>
        ) : isOwnAccount ? (
         
           <SimpleLinksButton skill={skill} />
        ) : null}
      </div>
    </div>
    
  
  );
};

export default SkillCard