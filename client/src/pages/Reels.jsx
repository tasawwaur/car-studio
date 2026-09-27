import React, { useState, useEffect, useContext, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { reels as reelsApi } from '../services/api';
import { BottomNav } from '../components/layout/BottomNav';
import './Reels.css';

/* ── Mock reels for offline state ── */
const MOCK_REELS = [
  {
    _id: 'r1',
    author: { _id: 'u1', name: 'Car_Explorer', username: 'car_explorer', isVerified: true, vehicleNumber: 'UP 11 AB 1234' },
    videoUrl: null,
    caption: 'Hills, Roads and Freedom 🚗💨',
    hashtags: '#thar #mountains #roadtrip #travel #india',
    audioName: 'Original Audio',
    likesCount: 12500,
    commentsCount: 420,
    sharesCount: 1300,
    bgGradient: 'linear-gradient(180deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
    emoji: '🏔️🚗',
  },
  {
    _id: 'r2',
    author: { _id: 'u2', name: 'Road_Nomad', username: 'road_nomad', isVerified: false, vehicleNumber: 'MH 12 AB 5678' },
    videoUrl: null,
    caption: 'Monsoon vibes on mountain roads 🌧️',
    hashtags: '#fortuner #monsoon #mountains #himachal',
    audioName: 'Tere Bina - AR Rahman',
    likesCount: 8900,
    commentsCount: 230,
    sharesCount: 670,
    bgGradient: 'linear-gradient(180deg, #141e30 0%, #243b55 100%)',
    emoji: '🌧️🏞️',
  },
  {
    _id: 'r3',
    author: { _id: 'u3', name: 'TharKing_UP', username: 'thar_king_up', isVerified: true, vehicleNumber: 'UP 32 YX 9999' },
    videoUrl: null,
    caption: 'Night drive hits different 🌃',
    hashtags: '#thar #nightdrive #attitude #mahindra',
    audioName: 'Original Audio',
    likesCount: 24100,
    commentsCount: 887,
    sharesCount: 3200,
    bgGradient: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
    emoji: '🌃🔥',
  },
];

/* ═══════════════════
   Single Reel Item
   ═══════════════════ */
const ReelItem = ({ reel, isActive, onLike }) => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const lastTap = useRef(0);

  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(reel.likesCount || 0);
  const [saved, setSaved] = useState(false);
  const [paused, setPaused] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [following, setFollowing] = useState(false);

  /* Auto-play / pause based on visibility */
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    if (isActive && !paused) {
      vid.play().catch(() => {});
    } else {
      vid.pause();
    }
  }, [isActive, paused]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (paused) {
      videoRef.current.play().catch(() => {});
      setPaused(false);
    } else {
      videoRef.current.pause();
      setPaused(true);
    }
  };

  const handleDoubleTap = () => {
    const now = Date.now();
    if (now - lastTap.current < 350) {
      if (!liked) {
        setLiked(true);
        setLikesCount(c => c + 1);
        onLike?.(reel._id);
      }
      setShowHeart(true);
      setTimeout(() => setShowHeart(false), 900);
    }
    lastTap.current = now;
  };

  const handleLike = () => {
    const next = !liked;
    setLiked(next);
    setLikesCount(c => next ? c + 1 : Math.max(0, c - 1));
    onLike?.(reel._id);
  };

  const fmtCount = (n) => {
    if (!n) return '0';
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return String(n);
  };

  const author = reel.author || {};
  const avatarUrl = author.avatar
    ? (author.avatar.startsWith('http') ? author.avatar : `http://localhost:4000${author.avatar}`)
    : null;

  return (
    <div className="rl-item">
      {/* ── Video / Placeholder ── */}
      <div className="rl-media" onClick={handleDoubleTap}>
        {reel.videoUrl ? (
          <video
            ref={videoRef}
            src={reel.videoUrl.startsWith('http') ? reel.videoUrl : `http://localhost:4000${reel.videoUrl}`}
            className="rl-video"
            loop
            playsInline
            muted
            onClick={togglePlay}
          />
        ) : (
          <div className="rl-placeholder" style={{ background: reel.bgGradient }}>
            <span className="rl-emoji">{reel.emoji || '🚗'}</span>
          </div>
        )}

        {/* Pause icon */}
        {paused && (
          <div className="rl-pause-icon">
            <svg viewBox="0 0 24 24" fill="white" width="60" height="60">
              <rect x="6" y="4" width="4" height="16" rx="1"/>
              <rect x="14" y="4" width="4" height="16" rx="1"/>
            </svg>
          </div>
        )}

        {/* Double-tap heart burst */}
        {showHeart && <div className="rl-heart-burst">❤️</div>}
      </div>

      {/* ── Dark gradient overlay ── */}
      <div className="rl-gradient-overlay" />

      {/* ── Right Sidebar ── */}
      <div className="rl-sidebar">

        {/* Avatar + Follow */}
        <div className="rl-sidebar-item rl-avatar-wrap" onClick={() => navigate(`/profile/${author._id}`)}>
          <div className="rl-avatar-ring">
            {avatarUrl
              ? <img src={avatarUrl} alt={author.name} className="rl-avatar" />
              : <div className="rl-avatar-ph">{(author.name || 'U')[0]}</div>
            }
          </div>
          <button
            className={`rl-follow-dot ${following ? 'rl-following' : ''}`}
            onClick={(e) => { e.stopPropagation(); setFollowing(f => !f); }}
          >
            {following ? '✓' : '+'}
          </button>
        </div>

        {/* Like */}
        <div className="rl-sidebar-item" onClick={handleLike}>
          <div className={`rl-action-icon ${liked ? 'rl-liked' : ''}`}>
            {liked
              ? <svg viewBox="0 0 24 24" fill="#ef4444" width="30" height="30"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35z"/></svg>
              : <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" width="30" height="30"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            }
          </div>
          <span className="rl-count">{fmtCount(likesCount)}</span>
        </div>

        {/* Comment */}
        <div className="rl-sidebar-item" onClick={() => navigate(`/post/${reel._id}`)}>
          <div className="rl-action-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" width="28" height="28">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <span className="rl-count">{fmtCount(reel.commentsCount)}</span>
        </div>

        {/* Share */}
        <div className="rl-sidebar-item">
          <div className="rl-action-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" width="28" height="28">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </div>
          <span className="rl-count">{fmtCount(reel.sharesCount)}</span>
        </div>

        {/* Save */}
        <div className="rl-sidebar-item" onClick={() => setSaved(s => !s)}>
          <div className={`rl-action-icon ${saved ? 'rl-saved' : ''}`}>
            {saved
              ? <svg viewBox="0 0 24 24" fill="#A855F7" width="28" height="28"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
              : <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" width="28" height="28"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
            }
          </div>
        </div>

        {/* Spinning disc */}
        <div className="rl-sidebar-item rl-disc-wrap">
          <div className="rl-disc">
            <span>🎵</span>
          </div>
        </div>
      </div>

      {/* ── Bottom Info ── */}
      <div className="rl-bottom-info">
        {/* User row */}
        <div className="rl-user-row">
          <span className="rl-username" onClick={() => navigate(`/profile/${author._id}`)}>
            @{author.username || author.name}
          </span>
          {author.isVerified && <span className="rl-verified">✓</span>}
          <button
            className={`rl-follow-btn ${following ? 'rl-following' : ''}`}
            onClick={() => setFollowing(f => !f)}
          >
            {following ? 'Following' : 'Follow'}
          </button>
        </div>

        {/* Caption */}
        <p className="rl-caption">{reel.caption}</p>

        {/* Hashtags */}
        {reel.hashtags && (
          <p className="rl-hashtags">{reel.hashtags}</p>
        )}

        {/* Vehicle tag */}
        {author.vehicleNumber && (
          <div className="rl-vehicle-tag">
            🚗 <span>{author.vehicleNumber}</span> <span className="rl-vtag-badge">✓</span>
          </div>
        )}

        {/* Audio info */}
        <div className="rl-audio-row">
          <span className="rl-audio-disc">🎵</span>
          <div className="rl-audio-marquee">
            <span>{reel.audioName || `Original Audio · @${author.username}`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════
   Reels Page
   ═══════════════════ */
const Reels = () => {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await reelsApi.getReels({ page: 1 });
        const data = res.data || [];
        setReels(data.length > 0 ? data : MOCK_REELS);
      } catch {
        setReels(MOCK_REELS);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  /* Track which reel is visible via IntersectionObserver */
  useEffect(() => {
    const items = containerRef.current?.querySelectorAll('.rl-item');
    if (!items || items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.dataset.idx, 10);
            setActiveIdx(idx);
          }
        });
      },
      { threshold: 0.6 }
    );

    items.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [reels]);

  if (loading) {
    return (
      <div className="rl-page">
        <div className="rl-loading">
          <div className="rl-spinner" />
          <span>Loading Reels...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rl-page">
      {/* Header */}
      <div className="rl-header">
        <span className="rl-header-title">Reels</span>
        <button className="rl-camera-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" width="22" height="22">
            <path d="M23 7l-7 5 7 5V7z"/>
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
          </svg>
        </button>
      </div>

      {/* Scroll container */}
      <div className="rl-container" ref={containerRef}>
        {reels.map((reel, idx) => (
          <div key={reel._id} data-idx={idx} className="rl-snap-item">
            <ReelItem
              reel={reel}
              isActive={idx === activeIdx}
              onLike={() => {
                try { reelsApi.likeReel(reel._id); } catch {}
              }}
            />
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export { Reels };
export default Reels;
