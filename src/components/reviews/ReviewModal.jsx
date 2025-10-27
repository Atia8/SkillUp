
// import { Star } from 'lucide-react';
// import { useState } from 'react';






// const ReviewModal = ({ userId,isOpen, onClose, onReviewSubmitted}) => {
// if (!isOpen) return null;
// const [rating, setRating] = useState(0);
// const [comment, setComment] = useState('');
// const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//  const handleSubmit = async () => {
    
//       if (rating<1||comment.length==0) {
//       setError('Please fill the mandatory(*) fields');
//       return;
//     }
//     if(comment.length>500)
//     {
//          setError('Comment must be 500 words or less');
//          return;
//     }
    
//     setLoading(true);
//      setError(''); // Clear previous errors
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/reviews/${userId}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//         rating: rating,
//         comment: comment
//       })
//       });

//       if (response.ok) {
//         const result = await response.json(); // Get the updated data from server
//          console.log('Review submitted:', result);
//           // Close modal and reset form
//       onClose();
//       setRating(0);
//       setComment('');
//         //onSave(formData);
//  onReviewSubmitted();
        
//       } else {
//        const errorData = await response.json();
//       setError(errorData.message || 'Failed to submit review');
//       }
//     } catch (error) {
//       console.error('Submit error:', error);
//     setError('Failed to submit review. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };


// return (
// <div className="fixed inset-0 backdrop-blur-[2px] backdrop-brightness-75 flex items-center justify-center p-4">
// <div className="bg-white rounded-xl max-w-2xl w-full p-8 border border-gray-600 shadow shadow-lg">
     
     
//      {error && (
//         <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
//           {error}
//         </div>
//       )}
//      <h2 className="text-2xl font-bold mb-2">Write a Review</h2>
//       <div className="mb-6">
// <label className="block text-lg font-medium text-gray-700 mb-3">
//             Your Rating *
//           </label>
// <div className="flex gap-2">
//   {[1, 2, 3, 4, 5].map((star) => (
//     <button 
//      onClick={() => {
//         setRating(star=== rating ? 0 : star);
//          setError('');
//      }}
//     key={star} type="button" >
//       <Star size={35} className="text-yellow-500"
//        fill={star <= rating ? "currentColor" : "none"}
//       />
//     </button>
//   ))}
// </div>
//       </div>

// <div className="mb-6">
//   <label className="block text-lg font-medium text-gray-700 mb-2">
//     Your Comment *
//   </label>
//   <textarea
//     value={comment}
//     onChange={(e) => {
//         setComment(e.target.value)
//        setError(''); // Clear any existing error
//     }}
//     placeholder="Share your experience..."
//     className="text-lg w-full p-3 border border-gray-300 rounded-lg  focus:ring-black focus:border-transparent resize-none"
//     rows="4"
//   />
// </div>

// <div className="flex gap-3 mt-6">
//           <button 
//            onClick={handleSubmit} 
//             className=" bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors"
//           >
//             Submit
//           </button>
//           <button 
//             onClick={onClose}
//             className="border border-gray-400 px-6 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
//           >
//             Cancel
//           </button>
//         </div>





//        {/* <button 
//             onClick={onClose} // This calls the onClose function from parent
//             className="text-gray-500 hover:text-gray-700"
//           >
//             ✕
//           </button> */}
// </div>
// </div>

// );
// };

// export default ReviewModal;


import { Star } from 'lucide-react';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { submitReview } from '../../api/reviews'; // Create this file





const ReviewModal = ({ userId,isOpen, onClose}) => {
if (!isOpen) return null;

//console.log("usser id::",userId)

 const queryClient = useQueryClient();
const [rating, setRating] = useState(0);
const [comment, setComment] = useState('');
const [error, setError] = useState('');
 
 // Add mutation
  const mutation = useMutation({
    mutationFn: (reviewData) => submitReview(reviewData),
    onSuccess: () => {
      // Invalidate and refetch reviews for this user
      queryClient.invalidateQueries(['reviews', userId]);
      // Reset form and close
      setRating(0);
      setComment('');
      onClose();
    },
    onError: (error) => {
      setError(error.message || 'Failed to submit review');
    }
  });

 const handleSubmit = async () => {
    
      if (rating<1||comment.length==0) {
      setError('Please fill the mandatory(*) fields');
      return;
    }
    if(comment.length>500)
    {
         setError('Comment must be 500 words or less');
         return;
    }
    
     setError(''); // Clear previous errors
//console.log("usser id::",userId)

  mutation.mutate({
    
      userId: userId,
    rating: rating,
    comment: comment
  });
    
      };

      


return (
<div className="fixed inset-0 backdrop-blur-[2px] backdrop-brightness-75 flex items-center justify-center p-4">
<div className="bg-white rounded-xl max-w-2xl w-full p-8 border border-gray-600 shadow shadow-lg">
     
     
     {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
     <h2 className="text-2xl font-bold mb-2">Write a Review</h2>
      <div className="mb-6">
<label className="block text-lg font-medium text-gray-700 mb-3">
            Your Rating *
          </label>
<div className="flex gap-2">
  {[1, 2, 3, 4, 5].map((star) => (
    <button 
     onClick={() => {
        setRating(star=== rating ? 0 : star);
         setError('');
     }}
    key={star} type="button" >
      <Star size={35} className="text-yellow-500"
       fill={star <= rating ? "currentColor" : "none"}
      />
    </button>
  ))}
</div>
      </div>

<div className="mb-6">
  <label className="block text-lg font-medium text-gray-700 mb-2">
    Your Comment *
  </label>
  <textarea
    value={comment}
    onChange={(e) => {
        setComment(e.target.value)
       setError(''); // Clear any existing error
    }}
    placeholder="Share your experience..."
    className="text-lg w-full p-3 border border-gray-300 rounded-lg  focus:ring-black focus:border-transparent resize-none"
    rows="4"
  />
</div>

<div className="flex gap-3 mt-6">
          <button 
           onClick={handleSubmit} 
             disabled={mutation.isLoading}
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





       {/* <button 
            onClick={onClose} // This calls the onClose function from parent
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button> */}
</div>
</div>

);
};

export default ReviewModal;