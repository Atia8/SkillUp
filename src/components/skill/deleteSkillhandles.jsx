

import { useState } from 'react';
import { deleteSkill } from '../../api/skillsApi';
import ConfirmationModal from './confirmModal';

const DeleteSkillHandler = ({ skill, queryClient, onComplete, children }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteSkill(skill.id);
      
      if (result.success) {
        await queryClient.invalidateQueries(['userSkills']);
        onComplete?.({ success: true, message: 'Skill deleted successfully' });
      } else {
        onComplete?.({ success: false, error: result.error });
      }
    } catch (error) {
      onComplete?.({ success: false, error: 'Network error' });
    } finally {
      setIsDeleting(false);
      setShowModal(false);
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    onComplete?.({ cancelled: true });
  };

  return (
    <>
      {/* Render children and pass click handler */}
      {children({ 
        onClick: handleOpenModal, 
        isDeleting 
      })}

      <ConfirmationModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onConfirm={handleDelete}
        message={`Are you sure you want to delete "${skill.skill_name}"?`}
      />
    </>
  );
};

export default DeleteSkillHandler;
