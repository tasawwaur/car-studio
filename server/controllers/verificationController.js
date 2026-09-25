const User = require('../models/User');
const Vehicle = require('../models/Vehicle');
const jwt = require('jsonwebtoken');

// Mock data in memory
const mockOtps = new Map();

exports.checkVehicle = async (req, res) => {
  try {
    const { registrationNumber } = req.body;
    // Mock always returns success
    res.json({
      success: true,
      vehicleDetails: {
        make: 'Thar',
        model: '2023',
        owner: 'Check owner name'
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verifyOwner = async (req, res) => {
  try {
    const { registrationNumber, ownerName } = req.body;
    // Always match in dev
    res.json({ match: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.sendOtp = async (req, res) => {
  try {
    const { registrationNumber } = req.body;
    mockOtps.set(registrationNumber, '123456');
    res.json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { registrationNumber, otp } = req.body;
    const storedOtp = mockOtps.get(registrationNumber);

    if (otp !== '123456') {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    const user = await User.findById(req.user._id);
    user.isVerified = true;
    user.vehicleVerifiedAt = new Date();
    user.vehicleNumber = registrationNumber;
    user.vehicleMake = 'Thar';
    user.vehicleModel = '2023';
    user.vehicleYear = '2023';
    await user.save();

    let vehicle = await Vehicle.findOne({ registrationNumber });
    if (!vehicle) {
      vehicle = new Vehicle({
        owner: user._id,
        registrationNumber,
        make: 'Thar',
        model: '2023',
        year: '2023',
        isVerified: true,
        verifiedAt: new Date()
      });
      await vehicle.save();
    }

    mockOtps.delete(registrationNumber);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '30d' });

    res.json({ user, token, message: 'Vehicle verified successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
