

import { Edit } from 'lucide-react';
import { useState } from 'react';
import Navbar from '../components/navigation/ResponsiveNavbar';
import ReviewModal from '../components/reviews/ReviewModal';
import { useParams,useLocation } from 'react-router-dom';
//const navigate = useNavigate(); // Add this
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchUserReviews } from '../api/reviews';
import  DeleteReviewHandler from '../components/reviews/deleteReviewHandler';

import { Star } from 'lucide-react';
import RatingProgressBar from '../components/reviews/RatingProgressBar';
import ReviewCard from '../components/reviews/ReviewCard';



const AllReview = () => {

    const { userId } = useParams();
    const location = useLocation();
  const isOwnAccount = location.state?.isOwnAccount || false;
  const userName = location.state?.userName;
  const visitinguser = location.state?.visitinguser;

console.log('reviewee',userId);

//const allReviews = location.state?.reviewsData || []; // Get the reviews
const navigate = useNavigate(); // Add this
  const refetchReviews= location.state?.refetchReviews;
    const [isModalOpen, setIsModalOpen] = useState(false);

const { data: reviews = [], isLoading, error } = useQuery({
  queryKey: ['reviews', userId], // Same key as ReviewSection
  queryFn: () => fetchUserReviews(userId) // Same function
});

     const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

 const handleReviewSubmitted = () => {
    // Trigger the refetch from ReviewSection
    if (refetchReviews) {
      refetchReviews();
    }
  };   

return(
    <div >
       
        <div className='mb-3'>
             <Navbar />
        </div>
        <div className="flex flex-col gap-4 p-7 max-w-7xl mx-auto">
        <div className='flex items-center justify-between '>
            <h1 className="text-4xl font-bold ">Reviews & Ratings</h1>
        {!isOwnAccount && (
        <button 
         onClick={handleOpenModal}
        className='flex gap-2 justify-center items-center px-2 sm:px-4 py-2 bg-black border border-gray-700 text-white rounded-lg font-semibold hover:bg-gray-700 whitespace-nowrap'>
            <Edit size={18} />
            Write a Review
        </button>
        )}
        
    </div>
   
    <p className="text-gray-600 font-sans text-lg">See what others are saying about {userName}'s teaching</p>
    {/* <p className="text-gray-600 font-sans text-lg">{reviews.averageRating}</p> */}
{/* <div className="flex flex-col sm:flex-row justify-between"> */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[400px_1fr] xl:grid-cols-[500px_700px] gap-6 justify-center">

    <div className=" border border-gray-200 rounded-lg flex flex-col  p-3">
      <h4>Overall Rating</h4>
      <div className="flex flex-col justify-center items-center">
           <h1 className="font-semibold text-5xl mt-1.5">{reviews.averageRating}</h1>
             {/* Step 1: Show 5 stars */}
    <div className="flex gap-0 mt-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star 
        key={star} 
        size={22}
        className={star <= reviews.averageRating ? "text-yellow-500" : "text-gray-300"}
        fill={star <= reviews.averageRating ? "currentColor" : "none"}
        />
      ))}
    </div>
    <h2 className="text-gray-400 mt-1.5 text-lg">Based on {reviews.totalReviews} reviews </h2>  
      </div> {/* here is end of card from rating header */}

      <div className="mt-4">
  {[5, 4, 3, 2, 1].map((rating) => (
    <RatingProgressBar 
      key={rating}
      rating={rating}
      percentage={reviews.ratingPercentages?.[rating] || 0}
      count={reviews.ratingDistribution?.[rating] || 0}
    />
  ))}
</div>

    </div>
   
   <div className=" border border-gray-200 rounded-lg flex flex-col p-3 gap-4 ">
      {/* <h4>Overall Rating</h4>
      <div className="flex flex-col justify-center items-center">
           <h1 className="font-semibold text-3xl mt-1.5">{reviews.averageRating}</h1>

      </div> */}
        
        {reviews.reviews?.map(review => (
    <ReviewCard key={review.id} reviewer={review} visitinguserId={userId}/>
  ))}
    </div>
</div>

    </div>

    <ReviewModal 
                userId={userId}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
              //onReviewSubmitted={handleReviewSubmitted}
                  //refetchReviews={refetchReviews} // Pass it here
            />
    </div>
   
);

};

export default AllReview;