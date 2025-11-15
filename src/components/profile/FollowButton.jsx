
import { UserPlus,UserMinus} from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { followUser,checkFollowStatus,unfollowUser,getFollowCount} from '../../api/followApi'

const FollowButton = ({ userId, isOwnProfile }) => {
    const queryClient = useQueryClient();
   
  // STEP 1: Check follow status
    const { 
        data: statusData, 
        isLoading: statusLoading, 
        error: statusError 
    } = useQuery({
        queryKey: ['followStatus', userId], // Unique key for this user's status
        queryFn: () => checkFollowStatus(userId),
        enabled: !!userId, // Only run if userId exists
    });

    // Extract the actual follow status from response
    const isFollowing = statusData?.data?.isFollowing;
    

  // Check follow count
    const { 
        data: countData, 
        isLoading: countLoading, 
        error: countError 
    } = useQuery({
        queryKey: ['followCount', userId], // Unique key for this user's status
        queryFn: () => getFollowCount(userId),
        enabled: !!userId, // Only run if userId exists
    });

    const followMutation = useMutation({
    mutationFn: () => followUser(userId),
    onSuccess: () => {
      // Invalidate and refetch relevant queries
       queryClient.invalidateQueries(['followStatus', userId]);
        queryClient.invalidateQueries(['followCount', userId]);
      // queryClient.invalidateQueries(['userProfile', userId]);
      
      // Show success message (optional)
      console.log('Successfully followed user!');
    },
    onError: (error) => {
      // Handle error
      console.error('Follow failed:', error);
      alert(error.message || 'Failed to follow user');
    }
  });


   const unfollowMutation = useMutation({
    mutationFn: () => unfollowUser(userId),
    onSuccess: () => {
      // Invalidate and refetch relevant queries
       queryClient.invalidateQueries(['followStatus', userId]);
      // queryClient.invalidateQueries(['followStats', userId]);
      // queryClient.invalidateQueries(['userProfile', userId]);
      
      // Show success message (optional)
      console.log('Successfully unfollowed user!');
    },
    onError: (error) => {
      // Handle error
      console.error('unFollow failed:', error);
      alert(error.message || 'Failed to unfollow user');
    }
  });

  const handleFollow = () => {
    if(isFollowing)
    unfollowMutation.mutate();
    else
    followMutation.mutate();
      
  };
  
     return(
         <div>
         <button 
             disabled={statusLoading || followMutation.isLoading}
            onClick={handleFollow}
            className={`flex justify-center items-center w-full px-4 py-2 rounded-lg font-medium transition-colors gap-1
              ${
       isFollowing 
      ? 'bg-gray-300 text-black hover:bg-gray-400 border border-gray-300' 
      : 'bg-black text-white hover:bg-gray-700'
            
            }`}
            >
            
              {isFollowing ? <UserMinus size={18} /> : <UserPlus size={18} />}
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
            </div>

);
};

export default FollowButton;