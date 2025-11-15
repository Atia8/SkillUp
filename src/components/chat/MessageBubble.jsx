const MessageBubble = ({ message, isMyMessage }) => {
  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div 
      className={`p-3 rounded-lg max-w-[75%] sm:max-w-xs md:max-w-2xl ${
        isMyMessage
          ? 'bg-blue-500 text-white ml-auto' 
          : 'bg-gray-200 text-gray-800'
      }`}
    >
      <p className="text-sm text-wrap break-words">{message.content}</p>
      <p className={`text-xs mt-1 ${
        isMyMessage ? 'text-blue-100' : 'text-gray-500'
      }`}>
        {isMyMessage ? 'You' : message.sender_name} • {formatTime(message.created_at)}
      </p>
    </div>
  );
};

export default MessageBubble;