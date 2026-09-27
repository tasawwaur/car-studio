import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './PostCard.css';

const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post?.likesCount || 128);
  const [saved, setSaved] = useState(false);
  const [following, setFollowing] = useState(false);
  const [currentMediaIdx, setCurrentMediaIdx] = useState(0);
  const [showHeart, setShowHeart] = useState(false);
  const [showRevModal, setShowRevModal] = useState(false);
  const [revRpm, setRevRpm] = useState(1200);
  const [isRevving, setIsRevving] = useState(false);
  const [showCommentDrawer, setShowCommentDrawer] = useState(false);
  const [commentList, setCommentList] = useState([
    { id: 'c1', name: 'Ananya Roy', text: 'Insane car build! Where was this shot? 🔥', time: '5m', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100' },
    { id: 'c2', name: 'Rahul Sharma', text: 'Count me in for the next weekend rally! 🏎️💨', time: '12m', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' }
  ]);
  const [newCommentText, setNewCommentText] = useState('');
  const lastTap = useRef(0);

  const author = post?.author || {};
  const mediaList = post?.mediaUrls?.length > 0
    ? post.mediaUrls
    : ['https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800'];

  /* ── Double-tap to like ── */
  const handleDoubleTap = () => {
    const now = Date.now();
    if (now - lastTap.current < 350) {
      if (!liked) {
        setLiked(true);
        setLikesCount(c => c + 1);
      }
      setShowHeart(true);
      setTimeout(() => setShowHeart(false), 900);
    }
    lastTap.current = now;
  };

  const handleLikeClick = (e) => {
    e.stopPropagation();
    const newLiked = !liked;
    setLiked(newLiked);
    setLikesCount(c => newLiked ? c + 1 : Math.max(0, c - 1));
  };

  const handleNextMedia = (e) => {
    e.stopPropagation();
    if (currentMediaIdx < mediaList.length - 1) {
      setCurrentMediaIdx(idx => idx + 1);
    }
  };

  const handlePrevMedia = (e) => {
    e.stopPropagation();
    if (currentMediaIdx > 0) {
      setCurrentMediaIdx(idx => idx - 1);
    }
  };

  /* ── V8 Engine Rev Simulator ── */
  const triggerEngineRev = () => {
    setIsRevving(true);
    let rpm = 1200;
    const interval = setInterval(() => {
      rpm += Math.floor(Math.random() * 900) + 600;
      if (rpm >= 8400) {
        rpm = 8500;
        clearInterval(interval);
        setTimeout(() => {
          setIsRevving(false);
          setRevRpm(1200);
        }, 1200);
      }
      setRevRpm(rpm);
    }, 100);
  };

  /* ── Post New Comment ── */
  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    const comment = {
      id: Date.now().toString(),
      name: 'Mohammad Tasawwar',
      text: newCommentText.trim(),
      time: 'Just now',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'
    };
    setCommentList(prev => [comment, ...prev]);
    setNewCommentText('');
  };

  // Parse hashtags from caption
  const parseHashtags = (text) => {
    if (!text) return [];
    const tags = text.match(/#[a-zA-Z0-9_]+/g);
    return tags || ['#carconnect', '#drive', '#luxury'];
  };

  const hashtags = parseHashtags(post?.caption);

  return (
    <article className="pc-card">

      {/* ── Header ── */}
      <div className="pc-header">
        <div className="pc-user" onClick={() => navigate(`/profile/${author._id || ''}`)}>
          {/* Avatar with Gold Crown Overlay */}
          <div className="pc-avatar-crown-wrapper">
            {author.avatar ? (
              <img src={author.avatar} alt={author.name} className="pc-user-avatar" />
            ) : (
              <div className="pc-avatar-fallback">{(author.name || 'C')[0]}</div>
            )}
            <span className="pc-crown-emoji" title="VIP Crown">👑</span>
          </div>

          <div className="pc-user-info">
            <div className="pc-name-row">
              <span className="pc-name">{author.name || 'Mohammad Tasawwar'}</span>
              {author.isVerified !== false && (
                <span className="pc-verified-blue" title="Verified Owner">✓</span>
              )}
            </div>

            {/* License Plate Pill Badge */}
            <div className="pc-plate-pill">
              <span className="pc-plate-car-icon">🚗</span>
              <span className="pc-plate-text">{author.vehicleNumber || 'UP 11 AB 1234'}</span>
              <span className="pc-plate-check-icon">✓</span>
            </div>
          </div>
        </div>

        {/* Right Header Actions */}
        <div className="pc-header-right">
          <button 
            className={`pc-follow-pill-btn ${following ? 'following' : ''}`}
            onClick={(e) => { e.stopPropagation(); setFollowing(f => !f); }}
          >
            {following ? 'Following' : 'Follow'}
          </button>
          <button className="pc-more-dots-btn" aria-label="Options">⋮</button>
        </div>
      </div>

      {/* ── Multi-photo Carousel Media ── */}
      <div className="pc-media-wrap" onClick={handleDoubleTap}>
        <img 
          src={mediaList[currentMediaIdx]} 
          alt="Car post media" 
          className="pc-media-img" 
        />

        {/* Rev Sound HUD Badge Overlay on Photo */}
        <button 
          className="pc-rev-sound-badge"
          onClick={(e) => { e.stopPropagation(); setShowRevModal(true); }}
        >
          🔥 Rev V8 Engine
        </button>

        {/* Previous & Next Carousel Arrows */}
        {currentMediaIdx > 0 && (
          <button className="pc-slide-arrow left-arrow" onClick={handlePrevMedia} aria-label="Previous image">
            ‹
          </button>
        )}
        {currentMediaIdx < mediaList.length - 1 && (
          <button className="pc-slide-arrow right-arrow" onClick={handleNextMedia} aria-label="Next image">
            ›
          </button>
        )}

        {/* Counter Badge (e.g., 1/5) */}
        {mediaList.length > 1 && (
          <div className="pc-carousel-badge">
            {currentMediaIdx + 1}/{mediaList.length}
          </div>
        )}

        {/* Carousel Pagination Dots */}
        {mediaList.length > 1 && (
          <div className="pc-carousel-dots">
            {mediaList.map((_, i) => (
              <span 
                key={i} 
                className={`dot ${i === currentMediaIdx ? 'active' : ''}`}
                onClick={(e) => { e.stopPropagation(); setCurrentMediaIdx(i); }}
              />
            ))}
          </div>
        )}

        {/* Double-tap heart burst */}
        {showHeart && <div className="pc-heart-burst">❤️</div>}
      </div>

      {/* ── Actions Row (Golden Icons) ── */}
      <div className="pc-actions">
        <div className="pc-actions-left">

          {/* Like */}
          <button 
            className={`pc-gold-act-btn ${liked ? 'liked' : ''}`}
            onClick={handleLikeClick}
            aria-label="Like"
          >
            <svg viewBox="0 0 24 24" className="pc-gold-svg">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35z"/>
            </svg>
            <span className="pc-act-count">{likesCount}</span>
          </button>

          {/* Comment Drawer Trigger */}
          <button 
            className="pc-gold-act-btn"
            onClick={() => setShowCommentDrawer(true)}
            aria-label="Comment"
          >
            <svg viewBox="0 0 24 24" className="pc-gold-svg">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <span className="pc-act-count">{commentList.length}</span>
          </button>

          {/* Share */}
          <button className="pc-gold-act-btn" aria-label="Share">
            <svg viewBox="0 0 24 24" className="pc-gold-svg">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
            <span className="pc-act-count">{post?.sharesCount || 18}</span>
          </button>
        </div>

        {/* Save/Bookmark */}
        <button 
          className={`pc-gold-act-btn pc-save-right ${saved ? 'saved' : ''}`}
          onClick={(e) => { e.stopPropagation(); setSaved(s => !s); }}
          aria-label="Bookmark"
        >
          <svg viewBox="0 0 24 24" className="pc-gold-svg">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
          </svg>
        </button>
      </div>

      {/* ── Liked By & Caption Area ── */}
      <div className="pc-details-area">
        <div className="pc-liked-by-row">
          <div className="pc-avatar-stack">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50" alt="" className="pc-stack-img s1" />
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50" alt="" className="pc-stack-img s2" />
            <img src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=50" alt="" className="pc-stack-img s3" />
          </div>
          <span className="pc-liked-text">
            Liked by <strong>Rahul</strong> and <strong>{likesCount - 1} others</strong>
          </span>
        </div>

        {/* Post Caption */}
        {post?.caption && (
          <p className="pc-caption-text">
            <strong className="pc-caption-author">{author.name || 'User'}</strong> {post.caption}
          </p>
        )}

        {/* Dynamic Hashtag Chips Row */}
        <div className="pc-hashtags-row">
          <span className="pc-hash-symbol">#</span>
          {hashtags.map((tag, idx) => (
            <span key={idx} className="pc-hash-chip-badge">
              {tag.replace('#', '')}
            </span>
          ))}
        </div>
      </div>

      {/* ── 🚀 V8 ENGINE REV SOUND HUD MODAL ── */}
      {showRevModal && (
        <div className="rev-hud-overlay" onClick={() => setShowRevModal(false)}>
          <div className="rev-hud-modal" onClick={(e) => e.stopPropagation()}>
            <button className="rev-close-btn" onClick={() => setShowRevModal(false)}>✕</button>

            <div className="rev-hud-header">
              <span className="rev-engine-badge">🔥 V8 TWIN-TURBO SOUND ENGINE</span>
              <h3 className="rev-car-title">{author.vehicleNumber || 'Porsche 911 GT3 RS'}</h3>
            </div>

            {/* Gauge Dial Animation */}
            <div className="rev-gauge-box">
              <div className="rev-rpm-display">
                <span className="rev-rpm-val">{revRpm}</span>
                <span className="rev-rpm-unit">RPM</span>
              </div>

              {/* Sound Wave Visualizer Bars */}
              <div className={`rev-wave-row ${isRevving ? 'active' : ''}`}>
                <span className="wave-bar" />
                <span className="wave-bar" />
                <span className="wave-bar" />
                <span className="wave-bar" />
                <span className="wave-bar" />
                <span className="wave-bar" />
              </div>
            </div>

            {/* Performance Stats */}
            <div className="rev-specs-grid">
              <div className="rev-spec-item">
                <span className="rev-spec-val">720 HP</span>
                <span className="rev-spec-label">POWER</span>
              </div>
              <div className="rev-spec-item">
                <span className="rev-spec-val">2.9s</span>
                <span className="rev-spec-label">0-100 KM/H</span>
              </div>
              <div className="rev-spec-item">
                <span className="rev-spec-val">330 KM/H</span>
                <span className="rev-spec-label">TOP SPEED</span>
              </div>
            </div>

            {/* REV THROTTLE BUTTON */}
            <button 
              className={`rev-throttle-btn ${isRevving ? 'revving' : ''}`}
              onClick={triggerEngineRev}
            >
              {isRevving ? '🏎️ REVVIN\' V8 EXHAUST...' : '⚡ PRESS TO REV ENGINE'}
            </button>
          </div>
        </div>
      )}

      {/* ── 💬 SLIDE-UP COMMENTS DRAWER ── */}
      {showCommentDrawer && (
        <div className="cmt-drawer-overlay" onClick={() => setShowCommentDrawer(false)}>
          <div className="cmt-drawer-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cmt-handle-bar" />

            <div className="cmt-drawer-hdr">
              <h3>Comments ({commentList.length})</h3>
              <button className="cmt-close-btn" onClick={() => setShowCommentDrawer(false)}>✕</button>
            </div>

            {/* Comments List */}
            <div className="cmt-list-scroll">
              {commentList.map(c => (
                <div key={c.id} className="cmt-item-row">
                  <img src={c.avatar} alt={c.name} className="cmt-user-avatar" />
                  <div className="cmt-text-wrap">
                    <div className="cmt-user-time">
                      <span className="cmt-username">{c.name}</span>
                      <span className="cmt-time">{c.time}</span>
                    </div>
                    <p className="cmt-body-text">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Comment Form */}
            <form className="cmt-input-bar" onSubmit={handleAddComment}>
              <input 
                type="text" 
                className="cmt-input-field"
                placeholder="Add a comment for this car..."
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
              />
              <button type="submit" className="cmt-send-btn">
                🚀
              </button>
            </form>
          </div>
        </div>
      )}

    </article>
  );
};

export default PostCard;
export { PostCard };
