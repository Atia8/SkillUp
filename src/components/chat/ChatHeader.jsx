import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const ChatHeader = ({ receiverName, receiverAvatar, ASSET_BASE_URL,discoverPage=false }) => {
 const navigate = useNavigate();
 
  const handleBackClick = () => {
    //navigate('/messages'); // Navigate to chat list page
     if (discoverPage) {
      navigate('/discover'); // Navigate to discover page if coming from there
    } else {
      navigate('/messages'); // Navigate to chat list page by default
    }
  };

  return (
    <>
      <div className="p-1 flex items-center">

         <button 
          onClick={handleBackClick}
          className="mr-2 p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Back to chat list"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="relative w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-3xl sm:self-start">

        {receiverAvatar ? (
          <img 
            src={`${ASSET_BASE_URL}${receiverAvatar}`} 
            alt={receiverName} 
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <svg 
            width="30" 
            height="30" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            className="text-gray-500"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        )}   
        </div>
        <h2 className="ml-3 font-semibold">{receiverName || 'User'}</h2>
      </div>
      <hr className="border-gray-300" />
    </>
  );
};

export default ChatHeader;