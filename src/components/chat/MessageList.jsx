import MessageBubble from './MessageBubble';

const MessageList = ({ messages, currentUser, socket }) => {
  const isMyMessage = (message) => {
    return currentUser && message.sender_id === currentUser.id;
  };

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-center text-gray-500">No messages yet. Send a message!</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="space-y-3 p-4">
        {messages.map((msg, index) => (
          <MessageBubble 
            key={msg.id || index} 
            message={msg} 
            isMyMessage={isMyMessage(msg)} 
          />
        ))}
      </div>
      
      {/* Socket status */}
      {/* <div className="mt-4 p-3 bg-blue-50 rounded-lg mx-4">
        <p className="text-sm text-blue-700">
          <strong>Socket Status:</strong> {socket ? '✅ Connected' : '❌ Disconnected'}
        </p>
        <p className="text-sm text-blue-700">
          <strong>Messages:</strong> {messages.length} received
        </p>
      </div> */}
    </div>
  );
};

export default MessageList;