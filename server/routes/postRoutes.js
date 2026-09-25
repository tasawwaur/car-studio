const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const postsUploadDir = path.resolve(__dirname, '../uploads/posts');
fs.mkdirSync(postsUploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, postsUploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  }
});

const upload = multer({ storage, limits: { fileSize: 50 * 1024 * 1024 } });

router.use(authMiddleware);

router.get('/feed', postController.getFeed);
router.post('/', postController.createPost);
router.get('/:id', postController.getPost);
router.post('/:id/like', postController.likePost);
router.post('/:id/comment', postController.addComment);
router.get('/:id/comments', postController.getComments);
router.delete('/:id', postController.deletePost);
router.get('/user/:userId', postController.getUserPosts);
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ fileUrl: `/uploads/posts/${req.file.filename}` });
});

module.exports = router;
