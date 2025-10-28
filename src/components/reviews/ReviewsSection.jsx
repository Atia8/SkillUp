// import { Star} from 'lucide-react';
// import { useState, useEffect } from 'react'; 
// import ReviewCard from './ReviewCard';
// import { useNavigate } from 'react-router-dom';


// const fetchUserReviews = async (userId) => {
// try
// {
//    const response = await fetch(`http://localhost:5000/api/reviews/user/${userId}`);
//    if (!response.ok) {
//       throw new Error('Failed to fetch reviews');
//     }
//      const data = await response.json();
//     return data;
// }

// catch(error)
// {
// console.error('Error fetching reviews:', error);
//     throw error;
// }
// };


// const ReviewsSection = ({user, isOwnAccount}) => {
//    const navigate = useNavigate();
//   console.log('id: ',user.id);
// const [loading, setLoading] = useState(true); 
// //const [reviews, setReviews] = useState([]);

// const [reviewsData, setReviewsData] = useState({
//     averageRating: 0,
//     totalReviews: 0,
//     reviews: []
//   });


//   useEffect(() => {
//     const loadReviews = async () => {
//     try{
//          setLoading(true);
//          const data = await fetchUserReviews(user.id); 
//         setReviewsData(data);
//     }

//    catch(error)
//    {
//        console.error('Error fetching reviews:', error);
//       throw error;
//    }
//    finally{
//     setLoading(false);
//    }
//     };

//     loadReviews();
//   },[user.id]);

//  const handleRefetch = () => {
//     fetchUserReviews();
//   };



// const handleViewAllReviews = () => {
//     navigate(`/review/${user.id}`, { 
//     state: { 
//       isOwnAccount: isOwnAccount,
//           userName: user.name,
//           reviewsData: reviewsData,  // Send the reviews data you fetched
//           refetchReviews: handleRefetch

//     }  
//   }); // Navigate to AllReview page
//   };

//   return (
//     <div className="bg-white rounded-xl border border-gray-200 p-5">
//       {/* Header */}
//       <div className="flex items-center gap-2 mb-4">
//         <Star size={22} className="text-yellow-500"/>
//         <h3 className="text-lg font-sans text-gray-900">Recent Reviews</h3>
//       </div>
//       {/* <div>
//          {reviews.map(review => (
//           <ReviewCard key={review.id} reviewer={review} />
//         ))}
//       </div> */}
//       <div>
//         <button
//  onClick={handleViewAllReviews} 
//          className="w-full text-center text-blue-500 hover:text-blue-700 font-medium py-2"
//         >
          
//           view all reviews
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ReviewsSection;


import { Star} from 'lucide-react';
import { useState, useEffect } from 'react'; 
import RecentReview from './RecentReview';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchUserReviews } from '../../api/reviews';




const ReviewsSection = ({user, isOwnAccount}) => {
    const navigate = useNavigate();
 

   const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['reviews', user.id],
    queryFn: () => fetchUserReviews(user.id)
  });
 


const handleViewAllReviews = () => {
   //console.log("user id: ",user.id);
    navigate(`/review/${user.id}`, { 
    state: { 
      isOwnAccount: isOwnAccount,
          userName: user.name,
         

    }  
  }); // Navigate to AllReview page
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Star size={22} className="text-yellow-500"/>
        <h3 className="text-lg font-sans text-gray-900">Recent Reviews</h3>
      </div>
     
      {/* Show first 2 reviews */}
<div className="space-y-0 mb-4">
  {reviews.reviews?.slice(0, 2).map((review, index,array) => (
    <div key={review.id}>
      <RecentReview reviewer={review} />
      {index < array.length - 1 && <hr className="border-gray-300 mx-2 mb-1" />} {/* ← Add HR between reviews */}
    </div>
  ))}
</div>

      <div>
        <button
 onClick={handleViewAllReviews} 
         className="rounded-lg border border-gray-300 w-full text-center text-black hover:bg-gray-200 font-semibold py-1"
        >
          
          View All Reviews
        </button>
      </div>
    </div>
  );
};

export default ReviewsSection;