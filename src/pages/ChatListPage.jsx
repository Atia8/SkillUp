// pages/ChatListPage.jsx
import { useQuery } from '@tanstack/react-query';
import { getChatList } from '../api/messageApi';
import { useNavigate } from 'react-router-dom';
import { useState, useMemo, useEffect } from 'react';
import { ArrowLeft,Search} from 'lucide-react';
import Navbar from '../components/navigation/ResponsiveNavbar';


 const API_BASE = import.meta.env.VITE_API_URL;
  const ASSET_BASE_URL = API_BASE.replace('/api', '');


const ChatListPage = () => {
  const navigate = useNavigate();
    const [search, setSearch] = useState('');
  const { data: conversations = [],refetch } = useQuery({
    queryKey: ['chatList'],
    queryFn: getChatList,
  });
 useEffect(() => {
    refetch();
  }, []);

  // 🆕 Simple search filter
  const filteredConversations = useMemo(() => {
    if (!search.trim()) return conversations;
    
    return conversations.filter(conversation => 
      conversation.user_name.toLowerCase().includes(search.toLowerCase())
    );
  }, [conversations, search]);

const handleBackClick = () => {
    navigate('/profile'); // Navigate to chat list page
  };

  return (
     <div className="min-h-screen bg-white w-full">
          <Navbar />
    
    <div className="p-4 max-w-5xl mx-auto">
       {/* <div className=" bg-white w-full">
            <Navbar />
          </div> */}

      <div className="flex items-center ">
       <button 
          onClick={handleBackClick}
          className="mr-2 p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Back to chat list"
        >
          <ArrowLeft size={20} />
        </button>

      <h1 className="text-2xl font-bold mb-4 mt-3">Messages</h1>
      </div>
       {/* 🆕 Search Input */}
      <div className="relative mb-6 ml-4 mr-2">
          <Search 
          size={20} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
          />
        <input
          type="text"
          placeholder="Search conversations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
      </div>

      <div className="space-y-3 p-4">
           {filteredConversations.length === 0 ? (
          // 🆕 Show message when no results
          <div className="text-center py-8 text-gray-500">
            {search ? `No conversations found for "${search}"` : 'No conversations yet'}
          </div>
        ) : (
        filteredConversations.map(conversation => (
          <div 
            key={conversation.user_id}
            onClick={() => navigate(`/chat/${conversation.user_id}`, {
              state: {
                receiverName: conversation.user_name,
                receiverAvatar: conversation.user_avatar
              }
            })}
            className="flex items-center gap-3 p-4 border border-gray-100 rounded-lg hover:bg-gray-50 cursor-pointer shadow shadow-gray-200"
          >
        <div className="relative w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-3xl sm:self-start">

            {/* Avatar */}
             {conversation.user_avatar ? (
            <img 
              src={`${ASSET_BASE_URL}${conversation.user_avatar}`} 
              alt={conversation.user_name}
              className="w-12 h-12 rounded-full"
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
            {/* Name & Last Message */}
            <div className="flex-1">
              <h3 className="font-semibold">{conversation.user_name}</h3>
              <p className="text-sm text-gray-600 truncate">

                  {conversation.last_message_sender_id === conversation.user_id 
                  ? conversation.user_name + ": " 
                  : "You: "
                }
               
                {conversation.last_message || 'No messages yet'}

              </p>
            </div>
          </div>
        ))
        )}
      </div>
    </div>
    </div>

  );
};

export default ChatListPage;