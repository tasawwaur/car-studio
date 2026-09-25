const express = require('express');
const router = express.Router();
const verificationController = require('../controllers/verificationController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/check-vehicle', verificationController.checkVehicle);
router.post('/verify-owner', verificationController.verifyOwner);
router.post('/send-otp', verificationController.sendOtp);
router.post('/verify-otp', verificationController.verifyOtp);

module.exports = router;
