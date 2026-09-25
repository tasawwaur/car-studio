const Booking = require('../models/Booking');
const Vehicle = require('../models/Vehicle');

exports.getAvailableCars = async (req, res) => {
  try {
    const { pickupDate, dropDate, carType, ...filters } = req.query;
    
    let query = { for_booking: true };
    if (carType) {
      query.category = carType;
    }

    const cars = await Vehicle.find(query).populate('owner', 'name username avatar isVerified');
    // Note: A real app would check overlap with existing bookings using pickupDate/dropDate
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createBooking = async (req, res) => {
  try {
    const { vehicleId, pickupLocation, dropLocation, pickupDate, dropDate } = req.body;
    
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle || !vehicle.for_booking) {
      return res.status(400).json({ error: 'Vehicle not available for booking' });
    }

    const start = new Date(pickupDate);
    const end = new Date(dropDate);
    const timeDiff = Math.abs(end.getTime() - start.getTime());
    const totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) || 1;
    const totalAmount = totalDays * (vehicle.booking_price_per_day || 1000); // fallback price

    const booking = new Booking({
      booker: req.user._id,
      vehicle: vehicleId,
      owner: vehicle.owner,
      pickupLocation,
      dropLocation,
      pickupDate,
      dropDate,
      totalDays,
      totalAmount
    });
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ booker: req.user._id })
      .populate('vehicle')
      .populate('owner', 'name username avatar')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    
    if (booking.booker.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    if (booking.status !== 'pending') {
      return res.status(400).json({ error: 'Can only cancel pending bookings' });
    }

    booking.status = 'cancelled';
    await booking.save();
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCarDetail = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id)
      .populate('owner', 'name username avatar isVerified bio location');
    if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });
    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
