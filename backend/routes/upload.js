const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { pool } = require('../config/database');
const fs = require('fs');
const authMiddleware = require('../middleware/authMiddleware');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/avatars/';
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },

  filename: function (req, file, cb) {
    // Use req.user.id from auth middleware
    const userId = req.user?.id;
    
    if (!userId) {
      return cb(new Error('User not authenticated'), null);
    }

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname).toLowerCase();
    
    cb(null, `user_${userId}_${uniqueSuffix}${fileExtension}`);
  }
});

// File filter to validate image types
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// POST /api/upload/avatar
router.post('/avatar', authMiddleware, upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded or invalid file type' });
    }

    // Get user ID from auth middleware
    const userId = req.user.id;
    const avatarUrl = `/uploads/avatars/${req.file.filename}`;

    // Update user_profiles table with UPSERT
    const upsertQuery = `
      INSERT INTO user_profiles (user_id, avatar_url, created_at, updated_at) 
      VALUES (?, ?, NOW(), NOW())
      ON DUPLICATE KEY UPDATE 
        avatar_url = VALUES(avatar_url), 
        updated_at = NOW()
    `;
    
    const [result] = await pool.execute(upsertQuery, [userId, avatarUrl]);

    res.json({
      success: true,
      avatarUrl: avatarUrl,
      message: 'Avatar uploaded successfully'
    });

  } catch (error) {
    console.error('Upload error:', error);

    // Clean up uploaded file if error occurred
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(500).json({ 
      error: 'Failed to upload avatar',
      details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

module.exports = router;