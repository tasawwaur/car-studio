const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const authMiddleware = require('../middleware/authMiddleware');
const chatController = require('../controllers/chatController');

const chatUploadDir = path.resolve(__dirname, '../uploads/chat');
fs.mkdirSync(chatUploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, chatUploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  }
});

const upload = multer({ storage, limits: { fileSize: 25 * 1024 * 1024 } });

router.use(authMiddleware);

router.get('/users/search', chatController.searchUsers);
router.post('/friends/request', chatController.sendFriendRequest);
router.get('/friends/list', chatController.getFriendsList);
router.post('/friends/block', chatController.blockUser);
router.post('/friends/unblock', chatController.unblockUser);
router.get('/history', chatController.getPrivateHistory);
router.get('/community/history', chatController.getCommunityHistory);
router.post('/send', chatController.sendMessageREST);
router.post('/upload', upload.single('file'), chatController.uploadChatFile);

module.exports = router;
