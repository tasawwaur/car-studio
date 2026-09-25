const express = require('express');
const router = express.Router();
const socialController = require('../controllers/socialController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/follow/:userId', socialController.followUser);
router.delete('/follow/:userId', socialController.unfollowUser);
router.get('/followers/:userId', socialController.getFollowers);
router.get('/following/:userId', socialController.getFollowing);
router.get('/notifications', socialController.getNotifications);
router.get('/profile/:userId', socialController.getUserProfile);
router.get('/search', socialController.searchUsers);

module.exports = router;
