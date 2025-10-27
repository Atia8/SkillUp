const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { testConnection } = require('./config/database');

// Import routes
const authRoutes = require('./routes/auth');
const uploadRoutes = require('./routes/upload'); // profile picture
const userRoutes = require('./routes/users');
const mentorRoutes = require('./routes/mentors');
const reviewRoutes = require('./routes/reviews');

const app = express();

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
  
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
      console.log(`🔐 Auth routes: http://localhost:${PORT}/api/auth/signup`);
    console.log(`🔐 Auth routes: http://localhost:${PORT}/api/auth/login`);

    console.log(`📁 Upload routes: http://localhost:${PORT}/api/upload/avatar`); 
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  });
};

// Start the server
initializeServer();