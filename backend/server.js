const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { testConnection } = require('./config/database');

// Import routes
const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes)

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
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  });
};

// Start the server
initializeServer();