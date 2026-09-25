const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/cars', bookingController.getAvailableCars);
router.post('/', bookingController.createBooking);
router.get('/my', bookingController.getMyBookings);
router.put('/:id/cancel', bookingController.cancelBooking);
router.get('/cars/:id', bookingController.getCarDetail);

module.exports = router;
