const Post = require('../models/Post');
const Like = require('../models/Like');
const Comment = require('../models/Comment');
const Follow = require('../models/Follow');
const User = require('../models/User');

exports.createPost = async (req, res) => {
  try {
    const { mediaUrls, caption, location, vehicleId, audienceType, tags } = req.body;
    const post = new Post({
      author: req.user._id,
      vehicle: vehicleId,
      mediaType: mediaUrls && mediaUrls.length > 0 && mediaUrls[0].match(/\.(mp4|mov)$/i) ? 'video' : (mediaUrls && mediaUrls.length > 0 ? 'photo' : 'text'),
      mediaUrls,
      caption,
      location,
      tags,
      audienceType
    });
    await post.save();
    
    await User.findByIdAndUpdate(req.user._id, { $inc: { postsCount: 1 } });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFeed = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    const filter = req.query.filter || 'foryou';

    let query = {};
    if (filter === 'following') {
      const follows = await Follow.find({ follower: req.user._id });
      const followingIds = follows.map(f => f.following);
      query = { author: { $in: followingIds } };
    } else {
      query = { audienceType: 'public' };
    }

    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author', 'name username avatar isVerified')
      .populate('vehicle', 'make model year');

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name username avatar isVerified')
      .populate('vehicle', 'make model year');
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const existingLike = await Like.findOne({ user: req.user._id, targetType: 'post', targetId: id });
    
    if (existingLike) {
      await Like.findByIdAndDelete(existingLike._id);
      await Post.findByIdAndUpdate(id, { $inc: { likesCount: -1 } });
      res.json({ liked: false });
    } else {
      await new Like({ user: req.user._id, targetType: 'post', targetId: id }).save();
      await Post.findByIdAndUpdate(id, { $inc: { likesCount: 1 } });
      res.json({ liked: true });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, parentComment } = req.body;
    const comment = new Comment({
      author: req.user._id,
      targetType: 'post',
      targetId: id,
      content,
      parentComment
    });
    await comment.save();
    await Post.findByIdAndUpdate(id, { $inc: { commentsCount: 1 } });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getComments = async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await Comment.find({ targetType: 'post', targetId: id })
      .populate('author', 'name username avatar')
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    
    await Post.findByIdAndDelete(req.params.id);
    await User.findByIdAndUpdate(req.user._id, { $inc: { postsCount: -1 } });
    res.json({ success: true, message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.userId })
      .sort({ createdAt: -1 })
      .populate('author', 'name username avatar')
      .populate('vehicle');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
