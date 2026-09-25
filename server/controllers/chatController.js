const Message = require('../models/Message');
const User = require('../models/User');
const Follow = require('../models/Follow');

exports.searchUsers = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.json([]);
    const users = await User.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { username: { $regex: query, $options: 'i' } }
      ]
    }).select('name username avatar isVerified');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.sendFriendRequest = async (req, res) => {
  // Adapted to sendFollowRequest
  try {
    const { targetUserId } = req.body;
    if (targetUserId === req.user._id.toString()) {
      return res.status(400).json({ error: 'Cannot follow yourself' });
    }
    const existing = await Follow.findOne({ follower: req.user._id, following: targetUserId });
    if (existing) return res.status(400).json({ error: 'Already following' });

    const follow = new Follow({ follower: req.user._id, following: targetUserId });
    await follow.save();

    await User.findByIdAndUpdate(req.user._id, { $inc: { followingCount: 1 } });
    await User.findByIdAndUpdate(targetUserId, { $inc: { followersCount: 1 } });

    res.json({ success: true, message: 'Followed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFriendsList = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [{ sender: req.user._id }, { receiver: req.user._id }]
    }).populate('sender receiver', 'name username avatar isVerified');

    const usersMap = new Map();
    messages.forEach(msg => {
      const otherUser = msg.sender._id.toString() === req.user._id.toString() ? msg.receiver : msg.sender;
      if (otherUser && !usersMap.has(otherUser._id.toString())) {
        usersMap.set(otherUser._id.toString(), otherUser);
      }
    });

    res.json(Array.from(usersMap.values()));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPrivateHistory = async (req, res) => {
  try {
    const { otherUserId } = req.query;
    const messages = await Message.find({
      roomType: 'private',
      $or: [
        { sender: req.user._id, receiver: otherUserId },
        { sender: otherUserId, receiver: req.user._id }
      ]
    }).sort({ createdAt: 1 }).populate('sender', 'name username avatar');
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCommunityHistory = async (req, res) => {
  try {
    const messages = await Message.find({ roomType: 'community' })
      .sort({ createdAt: -1 })
      .limit(100)
      .populate('sender', 'name username avatar isVerified vehicleMake vehicleModel');
    res.json(messages.reverse());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.uploadChatFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const fileUrl = `/uploads/chat/${req.file.filename}`;
    res.json({ fileUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.sendMessageREST = async (req, res) => {
  try {
    const { receiver, content, roomType, messageType, fileUrl } = req.body;
    const msg = new Message({
      sender: req.user._id,
      receiver: receiver || null,
      roomType: roomType || 'private',
      messageType: messageType || 'text',
      content,
      fileUrl
    });
    await msg.save();
    res.status(201).json(msg);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.blockUser = async (req, res) => {
  // Placeholder block user logic
  res.json({ success: true, message: 'User blocked' });
};

exports.unblockUser = async (req, res) => {
  // Placeholder unblock user logic
  res.json({ success: true, message: 'User unblocked' });
};
