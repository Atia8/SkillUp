import { useState } from 'react';
import { Send } from 'lucide-react';

const MessageInput = ({ onSendMessage, disabled = false }) => {
  const [messageInput, setMessageInput] = useState('');

  const handleSend = () => {
    if (messageInput.trim() && !disabled) {
      onSendMessage(messageInput);
      setMessageInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="p-4 bg-white border border-gray-300">
      <div className="flex gap-2 mb-2">
        <input 
          type="text" 
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          onKeyPress={handleKeyPress}
          disabled={disabled}
        />
        <button 
          onClick={handleSend}
          disabled={disabled || !messageInput.trim()}
          className="px-4 py-0 bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
            <Send size={22} />
         
        </button>
      </div>
     
    </div>
  );
};

export default MessageInput;