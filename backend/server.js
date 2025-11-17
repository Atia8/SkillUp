const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const http = require('http'); 
const initializeDatabase = require('./database/setup');


const { testConnection } = require('./config/database');

// Import routes
const authRoutes = require('./routes/auth');
const uploadRoutes = require('./routes/upload'); // profile picture
const userRoutes = require('./routes/users');
const mentorRoutes = require('./routes/mentors');
const reviewRoutes = require('./routes/reviews');
const followRoutes = require('./routes/follow');
const skillRoutes = require('./routes/skills');
const wishRoutes = require('./routes/wish');
const messageRoutes = require('./routes/messages');

const app = express();

const server = http.createServer(app); // ← ADD THIS

// Initialize Socket.io ← ADD THIS
const { initializeSocket } = require('./socket/socketHandler');
const io = initializeSocket(server);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/upload', uploadRoutes);
app.use('/uploads', express.static('uploads'))
app.use('/api/users', userRoutes);
app.use('/api/mentors', mentorRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/follow', followRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/wishlist', wishRoutes);
app.use('/api/messages', messageRoutes);




// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'SkillShare Connect Backend is running!',
    timestamp: new Date().toISOString()
  });
});

// Initialize database and start server
const initializeServer = async () => {
  console.log('🚀 Starting SkillShare Backend Server...');
  
  // Test database connection
  await testConnection();
  await initializeDatabase();

  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => {
     
    console.log(`✅ Server running on http://localhost:${PORT}`);
      console.log(`🔐 Auth routes: http://localhost:${PORT}/api/auth/signup`);
    console.log(`🔐 Auth routes: http://localhost:${PORT}/api/auth/login`);

    console.log(`📁 Upload routes: http://localhost:${PORT}/api/upload/avatar`); 
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  });
};

// Start the server
initializeServer();