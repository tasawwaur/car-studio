const express = require('express');
const router = express.Router();
const reelController = require('../controllers/reelController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const reelsUploadDir = path.resolve(__dirname, '../uploads/reels');
fs.mkdirSync(reelsUploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, reelsUploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  }
});

const upload = multer({ storage, limits: { fileSize: 100 * 1024 * 1024 } });

router.use(authMiddleware);

router.get('/', reelController.getReels);
router.post('/', reelController.createReel);
router.post('/:id/like', reelController.likeReel);
router.post('/:id/comment', reelController.addComment);
router.post('/:id/view', reelController.incrementView);
router.get('/user/:userId', reelController.getUserReels);
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ fileUrl: `/uploads/reels/${req.file.filename}` });
});

module.exports = router;
