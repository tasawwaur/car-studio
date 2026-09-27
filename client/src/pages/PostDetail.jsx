import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { posts as postsApi } from '../services/api';
import toast from 'react-hot-toast';
import './PostDetail.css';

const MOCK_POST = {
  _id: 'm1',
  author: { _id: 'u1', name: 'Rahul Sharma', username: 'rahul_thar', isVerified: true, vehicleNumber: 'UP 11 AB 1234' },
  mediaUrls: [],
  caption: 'Weekend drive to Mussoorie 🏔️🔥 #thar #mountains #roadtrip',
  location: 'Saharanpur, UP',
  likesCount: 1200,
  commentsCount: 3,
  createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
};

const MOCK_COMMENTS = [
  { _id: 'c1', author: { name: 'Neha Verma', avatar: null }, content: 'Bahut sundar 🔥', createdAt: new Date(Date.now() - 3600000).toISOString() },
  { _id: 'c2', author: { name: 'Vikram Singh', avatar: null }, content: 'Kab chal rahe ho bhai? 🚗', createdAt: new Date(Date.now() - 7200000).toISOString() },
  { _id: 'c3', author: { name: 'Arjun Thar', avatar: null }, content: 'Thar gang 🏔️💪', createdAt: new Date(Date.now() - 10800000).toISOString() },
];

export const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const commentRef = useRef(null);

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [saved, setSaved] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [posting, setPosting] = useState(false);
  const lastTap = useRef(0);

  useEffect(() => {
    const load = async () => {
      try {
        const [postRes, commentsRes] = await Promise.all([
          postsApi.getPost(id),
          postsApi.getComments(id),
        ]);
        setPost(postRes.data);
        setLikesCount(postRes.data.likesCount || 0);
        setComments(commentsRes.data || []);
      } catch {
        setPost(MOCK_POST);
        setLikesCount(MOCK_POST.likesCount);
        setComments(MOCK_COMMENTS);
      }
    };
    if (id && id !== 'm1') load();
    else { setPost(MOCK_POST); setLikesCount(MOCK_POST.likesCount); setComments(MOCK_COMMENTS); }
  }, [id]);

  const handleDoubleTap = () => {
    const now = Date.now();
    if (now - lastTap.current < 350 && !liked) {
      setLiked(true);
      setLikesCount(c => c + 1);
    }
    lastTap.current = now;
  };

  const handleLike = () => {
    const newLiked = !liked;
    setLiked(newLiked);
    setLikesCount(c => newLiked ? c + 1 : Math.max(0, c - 1));
    try { postsApi.likePost(id); } catch {}
  };

  const handleComment = async () => {
    if (!commentText.trim() || posting) return;
    setPosting(true);
    const text = commentText.trim();
    setCommentText('');
    const optimistic = {
      _id: 'opt-' + Date.now(),
      author: { name: user?.name || 'You', avatar: user?.avatar },
      content: text,
      createdAt: new Date().toISOString(),
    };
    setComments(prev => [optimistic, ...prev]);
    try {
      await postsApi.addComment(id, text);
    } catch {
      toast.error('Comment nahi ho saka');
    } finally {
      setPosting(false);
    }
  };

  const timeAgo = (date) => {
    const diff = (Date.now() - new Date(date)) / 1000;
    if (diff < 60) return 'Just now';
    if (diff < 3600) return Math.floor(diff / 60) + 'm';
    if (diff < 86400) return Math.floor(diff / 3600) + 'h';
    return Math.floor(diff / 86400) + 'd';
  };

  const formatCount = (n) => {
    if (!n) return '0';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return String(n);
  };

  const author = post?.author || {};
  const mediaUrl = post?.mediaUrls?.[0]
    ? (post.mediaUrls[0].startsWith('http') ? post.mediaUrls[0] : `http://localhost:4000${post.mediaUrls[0]}`)
    : null;

  return (
    <div className="pd-page">

      {/* ── Header ── */}
      <header className="pd-header">
        <button className="pd-back" onClick={() => navigate(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="pd-back-icon">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <span className="pd-title">Post</span>
        <button className="pd-more">···</button>
      </header>

      <div className="pd-scroll">

        {/* ── Author row ── */}
        {post && (
          <div className="pd-author-row">
            <div className="pd-avatar-ring" onClick={() => navigate(`/profile/${author._id}`)}>
              {author.avatar
                ? <img src={author.avatar} alt={author.name} className="pd-avatar" />
                : <div className="pd-avatar-ph">{(author.name || 'U')[0]}</div>
              }
            </div>
            <div className="pd-author-info">
              <div className="pd-author-name-row">
                <span className="pd-author-name">{author.name}</span>
                {author.isVerified && <span className="pd-verified">✓</span>}
              </div>
              <span className="pd-author-meta">
                {post.location || 'India'} · {timeAgo(post.createdAt)}
              </span>
            </div>
            <button className="pd-follow">Follow</button>
          </div>
        )}

        {/* ── Media ── */}
        <div className="pd-media-wrap" onClick={handleDoubleTap}>
          {mediaUrl ? (
            post?.mediaType === 'video'
              ? <video src={mediaUrl} className="pd-media" controls playsInline />
              : <img src={mediaUrl} alt="post" className="pd-media" />
          ) : (
            <div className="pd-media-placeholder">
              <span>🚗</span>
            </div>
          )}
        </div>

        {/* ── Actions ── */}
        <div className="pd-actions">
          <div className="pd-actions-left">

            {/* Like */}
            <button className={`pd-btn ${liked ? 'pd-liked' : ''}`} onClick={handleLike}>
              {liked
                ? <svg viewBox="0 0 24 24" fill="#ef4444" className="pd-icon"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35z"/></svg>
                : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="pd-icon"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              }
            </button>

            {/* Comment */}
            <button className="pd-btn" onClick={() => commentRef.current?.focus()}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="pd-icon">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </button>

            {/* Share */}
            <button className="pd-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="pd-icon">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>

          {/* Save */}
          <button className={`pd-btn ${saved ? 'pd-saved' : ''}`} onClick={() => setSaved(s => !s)}>
            {saved
              ? <svg viewBox="0 0 24 24" fill="#A855F7" className="pd-icon"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
              : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="pd-icon"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
            }
          </button>
        </div>

        {/* ── Likes count ── */}
        <div className="pd-likes-row">
          <span className="pd-likes-count">{formatCount(likesCount)} likes</span>
        </div>

        {/* ── Caption ── */}
        {post?.caption && (
          <div className="pd-caption-row">
            <span className="pd-cap-name">{author.name} </span>
            <span className="pd-cap-text">{post.caption}</span>
          </div>
        )}

        {/* ── Vehicle tag ── */}
        {author.vehicleNumber && (
          <div className="pd-vehicle-tag">
            🚗 <span>{author.vehicleNumber}</span>
            <span className="pd-vtag-badge">✓</span>
          </div>
        )}

        {/* ── Comments ── */}
        <div className="pd-comments-section">
          <span className="pd-comments-label">{comments.length} comments</span>
          {comments.map(c => (
            <div key={c._id} className="pd-comment">
              <div className="pd-com-avatar">
                {c.author?.avatar
                  ? <img src={c.author.avatar} alt="" />
                  : <span>{(c.author?.name || 'U')[0]}</span>
                }
              </div>
              <div className="pd-com-body">
                <span className="pd-com-name">{c.author?.name} </span>
                <span className="pd-com-text">{c.content}</span>
                <div className="pd-com-meta">
                  <span>{timeAgo(c.createdAt)}</span>
                  <button className="pd-com-like">♡ Like</button>
                  <button className="pd-com-reply">Reply</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Comment Input (sticky bottom) ── */}
      <div className="pd-comment-bar">
        <div className="pd-com-input-avatar">
          {user?.avatar
            ? <img src={user.avatar} alt="you" />
            : <span>{(user?.name || 'Y')[0]}</span>
          }
        </div>
        <input
          ref={commentRef}
          className="pd-com-input"
          placeholder="Add a comment..."
          value={commentText}
          onChange={e => setCommentText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleComment()}
        />
        <button
          className={`pd-com-post-btn ${commentText.trim() ? 'pd-com-active' : ''}`}
          onClick={handleComment}
          disabled={!commentText.trim() || posting}
        >
          Post
        </button>
      </div>

    </div>
  );
};

export default PostDetail;
