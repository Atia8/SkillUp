// backend/socket/handlers/userHandler.js
const handleUserRegistration = (socket, userId) => {
  socket.join(`user_${userId}`);
  console.log(`👤 User ${userId} registered (socket: ${socket.id})`);
};

module.exports = { handleUserRegistration };