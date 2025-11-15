
import { useState } from 'react';
import { deleteReview } from '../../api/reviews';
import ConfirmationModal from '../skill/confirmModal';
import { useQueryClient } from '@tanstack/react-query'

const DeleteReviewHandler = ({ reviewer,onComplete,visitinguserId,onClose}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showModal, setShowModal] = useState(true);
const queryClient = useQueryClient();

console.log('reviewee in delete file',visitinguserId);

  const handleDelete = async () => {

    setIsDeleting(true);
        try {
          const result = await deleteReview(visitinguserId);
            console.log('📨 API Result:', result);
    
          if (result.success) {
             console.log('✅ Delete successful, refreshing data...');
            //await queryClient.invalidateQueries(['reviews']);
            //onComplete?.({ success: true, message: 'Skill deleted successfully' });

               const currentReviews = queryClient.getQueryData(['reviews']);
      console.log('📊 Current reviews in cache:', currentReviews);
      
      // Invalidate and refetch
      await queryClient.invalidateQueries(['reviews']);
      
      // Force refetch and check new data
      const newData = await queryClient.refetchQueries(['reviews',user.id]);
      console.log('🔄 New data after refetch:', newData);
          } else {
             console.error('❌ API returned error:', result.error);
            //onComplete?.({ success: false, error: result.error });
          }
        } catch (error) {
          //onComplete?.({ success: false, error: 'Network error' });
        } finally {
          setIsDeleting(false);
          setShowModal(false);
          onClose?.();
        }

  };

   const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    //onComplete?.({ cancelled: true });
     onClose?.();
  };

  return(

 <ConfirmationModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onConfirm={handleDelete}
        message={`Are you sure you want to delete?`}
      />

  );
  };

export default DeleteReviewHandler;
