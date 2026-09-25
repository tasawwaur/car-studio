const Follow = require('../models/Follow');
const Notification = require('../models/Notification');
const User = require('../models/User');
const Vehicle = require('../models/Vehicle');

exports.followUser = async (req, res) => {
  try {
    const { targetUserId } = req.params;
    if (targetUserId === req.user._id.toString()) {
      return res.status(400).json({ error: 'Cannot follow yourself' });
    }
    const existing = await Follow.findOne({ follower: req.user._id, following: targetUserId });
    if (existing) return res.status(400).json({ error: 'Already following' });

    const follow = new Follow({ follower: req.user._id, following: targetUserId });
    await follow.save();

    await User.findByIdAndUpdate(req.user._id, { $inc: { followingCount: 1 } });
    await User.findByIdAndUpdate(targetUserId, { $inc: { followersCount: 1 } });

    const notif = new Notification({
      recipient: targetUserId,
      sender: req.user._id,
      type: 'follow',
      message: 'started following you'
    });
    await notif.save();

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.unfollowUser = async (req, res) => {
  try {
    const { targetUserId } = req.params;
    const existing = await Follow.findOne({ follower: req.user._id, following: targetUserId });
    if (!existing) return res.status(400).json({ error: 'Not following' });

    await Follow.findByIdAndDelete(existing._id);
    await User.findByIdAndUpdate(req.user._id, { $inc: { followingCount: -1 } });
    await User.findByIdAndUpdate(targetUserId, { $inc: { followersCount: -1 } });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFollowers = async (req, res) => {
  try {
    const follows = await Follow.find({ following: req.params.userId }).populate('follower', 'name username avatar isVerified');
    res.json(follows.map(f => f.follower));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFollowing = async (req, res) => {
  try {
    const follows = await Follow.find({ follower: req.params.userId }).populate('following', 'name username avatar isVerified');
    res.json(follows.map(f => f.following));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.user._id })
      .sort({ createdAt: -1 })
      .populate('sender', 'name username avatar isVerified');
    
    await Notification.updateMany({ recipient: req.user._id, read: false }, { read: true });
    
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    const vehicles = await Vehicle.find({ owner: user._id });
    const isFollowing = req.user ? await Follow.exists({ follower: req.user._id, following: user._id }) : false;

    res.json({ ...user.toObject(), vehicles, isFollowing: !!isFollowing });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.searchUsers = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.json([]);
    const users = await User.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { username: { $regex: query, $options: 'i' } }
      ]
    }).select('name username avatar isVerified location bio followersCount');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
