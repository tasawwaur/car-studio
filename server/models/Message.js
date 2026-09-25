const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // null = community/public
  roomType: { type: String, enum: ['private', 'community'], default: 'private' },
  messageType: { type: String, enum: ['text', 'image', 'audio', 'video'], default: 'text' },
  content: { type: String },
  fileUrl: { type: String },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', messageSchema);
