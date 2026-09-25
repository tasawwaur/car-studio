const Reel = require('../models/Reel');
const Like = require('../models/Like');
const Comment = require('../models/Comment');

exports.createReel = async (req, res) => {
  try {
    const { videoUrl, thumbnailUrl, caption, vehicleId, audioName } = req.body;
    const reel = new Reel({
      author: req.user._id,
      vehicle: vehicleId,
      videoUrl,
      thumbnailUrl,
      caption,
      audioName
    });
    await reel.save();
    res.status(201).json(reel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReels = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const reels = await Reel.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author', 'name username avatar isVerified')
      .populate('vehicle', 'make model year');

    res.json(reels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.likeReel = async (req, res) => {
  try {
    const { id } = req.params;
    const existingLike = await Like.findOne({ user: req.user._id, targetType: 'reel', targetId: id });
    
    if (existingLike) {
      await Like.findByIdAndDelete(existingLike._id);
      await Reel.findByIdAndUpdate(id, { $inc: { likesCount: -1 } });
      res.json({ liked: false });
    } else {
      await new Like({ user: req.user._id, targetType: 'reel', targetId: id }).save();
      await Reel.findByIdAndUpdate(id, { $inc: { likesCount: 1 } });
      res.json({ liked: true });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const comment = new Comment({
      author: req.user._id,
      targetType: 'reel',
      targetId: id,
      content
    });
    await comment.save();
    await Reel.findByIdAndUpdate(id, { $inc: { commentsCount: 1 } });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.incrementView = async (req, res) => {
  try {
    const { id } = req.params;
    await Reel.findByIdAndUpdate(id, { $inc: { viewsCount: 1 } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserReels = async (req, res) => {
  try {
    const reels = await Reel.find({ author: req.params.userId })
      .sort({ createdAt: -1 })
      .populate('author', 'name username avatar');
    res.json(reels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
