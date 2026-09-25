const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  registrationNumber: { type: String, required: true, unique: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  variant: { type: String },
  year: { type: String },
  fuelType: { type: String, enum: ['petrol', 'diesel', 'electric', 'hybrid', 'cng'] },
  category: { type: String, enum: ['hatchback', 'sedan', 'suv', 'luxury', 'sports', 'bike'] },
  images: [{ type: String }],
  isVerified: { type: Boolean, default: false },
  verifiedAt: { type: Date },
  for_booking: { type: Boolean, default: false },
  booking_price_per_day: { type: Number, default: 0 },
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
