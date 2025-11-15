import { useParams, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { profileApi } from '../api/profileApi';
import { useSocket } from '../components/chat/hooks/useSocket';
import ChatHeader from '../components/chat/ChatHeader';
import MessageList from '../components/chat/MessageList';
import MessageInput from '../components/chat/MessageInput';
import { getChatHistory } from '../api/messageApi';

const ChatPage = () => {
  const { receiverId } = useParams();
  const location = useLocation();
  const { receiverName, receiverAvatar, discoverPage } = location.state || {};
  
  const API_BASE = import.meta.env.VITE_API_URL; 
  const ASSET_BASE_URL = API_BASE.replace('/api', ''); 
  
  // Get current user
  const { data: currentUser = null, isLoading: userLoading, error: userError } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => profileApi.getCurrentUser()
  });

const { data: historyData, isLoading: historyLoading } = useQuery({
    queryKey: ['chatHistory', currentUser?.id, receiverId],
    queryFn: () => getChatHistory(receiverId),
    enabled: !!currentUser && !!receiverId, // Only run when we have both IDs
  });



  // Socket logic
  const { socket, messages: realTimeMessages, sendMessage } = useSocket(currentUser);

 const allMessages = [
    ...(historyData|| []),
    ...realTimeMessages
  ];


  // Handle sending messages
  const handleSendMessage = (content) => {
    const success = sendMessage(content, receiverId);
    if (success) {
      console.log('📤 Message sent:', content);
    }
  };

  // Loading and error states
  if (userLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-lg">Loading user information...</div>
      </div>
    );
  }

  if (userError) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-lg text-red-500">Error loading user</div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-lg text-red-500">Please log in to use chat</div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col ">
      <div className="p-4 pb-0">
        <ChatHeader 
          receiverName={receiverName}
          receiverAvatar={receiverAvatar}
          ASSET_BASE_URL={ASSET_BASE_URL}
          discoverPage={discoverPage}
        />
      </div>
      
      <MessageList 
        messages={allMessages}
        currentUser={currentUser}
        socket={socket}
      />
      
      <MessageInput 
        onSendMessage={handleSendMessage}
        disabled={!socket}
      />
    </div>
  );
};

export default ChatPage;

// import { useParams, useLocation } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';
// import { profileApi } from '../api/profileApi';
// import { useSocket } from '../components/chat/hooks/useSocket';
// import ChatHeader from '../components/chat/ChatHeader';
// import MessageList from '../components/chat/MessageList';
// import MessageInput from '../components/chat/MessageInput';
// import { getChatHistory } from '../api/messageApi';

// const ChatPage = () => {
//   const { receiverId } = useParams();
//   const location = useLocation();
//   const { receiverName, receiverAvatar } = location.state || {};
  
//   const API_BASE = import.meta.env.VITE_API_URL; 
//   const ASSET_BASE_URL = API_BASE.replace('/api', ''); 
  
//   // 🆕 Debug logging
//   console.log('🔍 ChatPage Debug:', {
//     receiverId,
//     receiverName,
//     hasToken: !!localStorage.getItem('token'),
//     API_BASE
//   });

//   // Get current user
//   const { data: currentUser = null, isLoading: userLoading, error: userError } = useQuery({
//     queryKey: ['currentUser'],
//     queryFn: () => profileApi.getCurrentUser()
//   });

// // const { data: historyData, isLoading: historyLoading, error: historyError } = useQuery({
// //   queryKey: ['chatHistory', receiverId],
// //   queryFn: async () => {
// //     console.log('🚀 API CALL: getChatHistory with receiverId:', receiverId);
// //     const result = await getChatHistory(receiverId);
// //     console.log('✅ API RESULT:', result);
// //     return result;
// //   },
// //   enabled: !!receiverId && !!currentUser, // Wait for both
// //   retry: 1,
// //   staleTime: 2 * 60 * 1000, // 2 minutes
// // });

// const { data: historyData, isLoading: historyLoading } = useQuery({
//     queryKey: ['chatHistory', currentUser?.id, receiverId],
//     queryFn: () => getChatHistory(receiverId),
//     enabled: !!currentUser && !!receiverId, // Only run when we have both IDs
//   });

//   // Socket logic
//   const { socket, messages: realTimeMessages, sendMessage } = useSocket(currentUser);

//   // Combine history + real-time messages
//   const allMessages = [
//     ...(historyData|| []),
//     ...realTimeMessages
//   ];

//   // console.log('📊 Messages State:', {
//   //   historyCount: historyData?.length || 0,
//   //   realTimeCount: realTimeMessages.length,
//   //   totalCount: allMessages.length
//   // });

//   // Handle sending messages
//   const handleSendMessage = (content) => {
//     const success = sendMessage(content, receiverId);
//     if (success) {
//       console.log('📤 Message sent:', content);
//     }
//   };

//   // Combined loading state
//   if (userLoading) {
//     console.log('⏳ Loading state active');
//     return (
//       <div className="h-screen flex items-center justify-center">
//         <div className="text-lg">Loading conversation...</div>
//       </div>
//     );
//   }

//   if (userError ) {
//     console.log('❌ Error state:', { userError, historyError });
//     return (
//       <div className="h-screen flex items-center justify-center">
//         <div className="text-lg text-red-500">
//           Error: {userError?.message || historyError?.message}
//         </div>
//       </div>
//     );
//   }

//   if (!currentUser) {
//     return (
//       <div className="h-screen flex items-center justify-center">
//         <div className="text-lg text-red-500">Please log in to use chat</div>
//       </div>
//     );
//   }

//   return (
//     <div className="h-screen flex flex-col">
//       <div className="p-6 pb-0">
//         <ChatHeader 
//           receiverName={receiverName}
//           receiverAvatar={receiverAvatar}
//           ASSET_BASE_URL={ASSET_BASE_URL}
//         />
//       </div>
      
//       <MessageList 
//         messages={allMessages}
//         currentUser={currentUser}
//         socket={socket}
//       />
      
//       <MessageInput 
//         onSendMessage={handleSendMessage}
//         disabled={!socket}
//       />
//     </div>
//   );
// };

// export default ChatPage;