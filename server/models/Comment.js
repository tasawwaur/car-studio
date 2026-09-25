const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  targetType: { type: String, enum: ['post', 'reel'], required: true },
  targetId: { type: mongoose.Schema.Types.ObjectId, required: true },
  content: { type: String, required: true },
  likesCount: { type: Number, default: 0 },
  parentComment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }, // for replies
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', commentSchema);
