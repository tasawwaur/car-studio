const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' },
  mediaType: { type: String, enum: ['photo', 'video', 'text'], required: true },
  mediaUrls: [{ type: String }],
  caption: { type: String },
  location: { type: String },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  audienceType: { type: String, enum: ['public', 'followers', 'private'], default: 'public' },
  likesCount: { type: Number, default: 0 },
  commentsCount: { type: Number, default: 0 },
  sharesCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', postSchema);
