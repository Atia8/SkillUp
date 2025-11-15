

import { useState } from 'react';
import { removeFromWishlist } from '../../api/wishApi';
import ConfirmationModal from '../skill/confirmModal';
 import { useQuery } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';

const DeleteSkillHandler = ({ skill,onComplete, children }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showModal, setShowModal] = useState(false);
   const queryClient = useQueryClient();


  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await removeFromWishlist(skill.id);
        console.log('📨 API Result:', result);

      if (result.success) {
         console.log('✅ Delete successful, refreshing data...');
        await queryClient.invalidateQueries(['wishSkills']);
        onComplete?.({ success: true, message: 'Skill deleted successfully' });
      } else {
         console.error('❌ API returned error:', result.error);
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
        message={`Are you sure you want to delete "${skill.wish_skill_name}"?`}
      />
    </>
  );
};

export default DeleteSkillHandler;
