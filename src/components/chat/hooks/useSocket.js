import { useState, useEffect, useCallback } from 'react';
import { io } from 'socket.io-client';

const API_BASE= import.meta.env.VITE_API_URL; 
const ASSET_BASE_URL = API_BASE.replace('/api', '');

export const useSocket = (currentUser) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const newSocket = io(ASSET_BASE_URL);
    setSocket(newSocket);
    
    newSocket.on('new_message', (message) => {
      console.log('✅ REAL-TIME: Received message:', message);
      setMessages(prev => [...prev, message]);
    });

    newSocket.on('message_error', (error) => {
      console.error('❌ Message error:', error);
      alert(`Error: ${error.error}`);
    });

    return () => newSocket.disconnect();
  }, []);

  useEffect(() => {
    if (socket && currentUser) {
      socket.emit('register_user', currentUser.id);
      console.log(`👤 Registered user: ${currentUser.id} (${currentUser.name})`);
    }
  }, [socket, currentUser]);

  const sendMessage = useCallback((content, receiverId) => {
    if (socket && content.trim() && currentUser) {
      console.log('🚀 Sending message...');
      socket.emit('send_message', {
        senderId: currentUser.id,
        receiverId: parseInt(receiverId),
        content: content
      });
      return true;
    }
    return false;
  }, [socket, currentUser]);

  return { socket, messages, sendMessage };
};