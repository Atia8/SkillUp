const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const addSkill = require('../controllers/skills/addSkill');
const getUserSkills = require('../controllers/skills/getUserSkills');
const deleteSkill = require('../controllers/skills/deleteSkill');

//console.log('✅ Reviews route loaded');
// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/certificates/'); // Create this folder
  },
  filename: function (req, file, cb) {
    // Generate unique filename: userID_timestamp_random.pdf
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, req.user.id + '-' + uniqueSuffix + '.pdf');
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  }
});

// POST /api/skills - Add new skill with optional certificate
router.post('/', authMiddleware, upload.single('certificateFile'), addSkill);

// Add this route:
router.get('/:userId', getUserSkills);

//delete
router.delete('/:skillId', authMiddleware, deleteSkill);

module.exports = router;