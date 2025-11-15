// backend/socket/socketHandler.js

const { Server } = require('socket.io');
const { handleSendMessage } = require('./handlers/messageHandler');
const { handleUserRegistration } = require('./handlers/userHandler');

// DEBUG: Check environment variables
console.log('🔧 [SocketHandler] FRONTEND_URL:', process.env.FRONTEND_URL);
console.log('🔧 [SocketHandler] PORT:', process.env.PORT);

const initializeSocket = (server) => {
  // Create Socket.io server
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL ||"http://localhost:5173", // Your React app
      methods: ["GET", "POST"]
    }
  });

  // When a user connects
  io.on('connection', (socket) => {
    console.log('🔌 New user connected:', socket.id);

    // Route events to appropriate handlers
    socket.on('register_user', (userId) => {
      handleUserRegistration(socket, userId);
    });

    socket.on('send_message', (data) => {
      handleSendMessage(socket, data);
    });
    
    // When user disconnects
    socket.on('disconnect', () => {
      console.log('❌ User disconnected:', socket.id);
    });
  });

  return io;
};

module.exports = { initializeSocket };