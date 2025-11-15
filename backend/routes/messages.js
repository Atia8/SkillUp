const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const sendMessage = require('../controllers/message/sendMessage');
const getMessagesWithUser = require('../controllers/message/getMessagesWithUser');
const getChatList = require('../controllers/message/getChatList'); // 🆕 Import the 

router.post('/', authMiddleware, sendMessage);
router.get('/:otherUserId', authMiddleware, getMessagesWithUser);


router.get('/list/conversations', authMiddleware, getChatList);

module.exports = router;