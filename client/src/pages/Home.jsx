import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PostCard } from '../components/cards/PostCard';
import { BottomNav } from '../components/layout/BottomNav';
import { AuthContext } from '../context/AuthContext';
import './Home.css';

/* ── Dynamic Multi-photo Sample Posts ── */
const DYNAMIC_FEED_POSTS = [
  {
    _id: 'p1',
    author: { 
      _id: 'u1', 
      name: 'Mohammad Tasawwar', 
      username: 'tasawwar_cars', 
      isVerified: true, 
      vehicleNumber: 'UP 11 AB 1234',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
    },
    mediaUrls: [
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
      'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800'
    ],
    mediaType: 'image',
    caption: 'Future of Hypercars ⚡ Futuristic Design & Pure Horsepower! #hypercar #carconnect #future #drive',
    location: 'Saharanpur · India',
    likesCount: 128,
    commentsCount: 24,
    sharesCount: 18,
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'p2',
    author: { 
      _id: 'u2', 
      name: 'Rahul Sharma', 
      username: 'rahul_thar', 
      isVerified: true, 
      vehicleNumber: 'DL 5S AB 9999',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
    },
    mediaUrls: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800',
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=800'
    ],
    mediaType: 'image',
    caption: 'Offroad Thar Expedition 🏔️ Offroading in the mountains hit different! #thar #offroad #mountains #drive',
    location: 'Manali · Himachal',
    likesCount: 342,
    commentsCount: 58,
    sharesCount: 42,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  }
];

const STORIES_DATA = [
  { id: 's0', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300', name: 'Tasawwar Malik', vehicle: 'UP 11 AB 1234', label: 'Your Story', isAdd: true },
  { id: 's1', img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800', name: 'Ananya Roy', vehicle: 'MH 02 CZ 7777', label: 'Near You', active: true },
  { id: 's2', img: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800', name: 'Rahul Sharma', vehicle: 'DL 5S AB 9999', label: 'Trending', active: true },
  { id: 's3', img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800', name: 'Vikram Singh', vehicle: 'HR 26 XX 8888', label: 'Creta', active: true },
  { id: 's4', img: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800', name: 'Neha Verma', vehicle: 'DL 8C AB 1234', label: 'Thar', active: true }
];

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [activeStory, setActiveStory] = useState(null);

  const [posts, setPosts] = useState(() => {
    try {
      const saved = localStorage.getItem('cc_home_feed');
      return saved ? JSON.parse(saved) : DYNAMIC_FEED_POSTS;
    } catch {
      return DYNAMIC_FEED_POSTS;
    }
  });

  useEffect(() => {
    const handleSync = () => {
      try {
        const saved = localStorage.getItem('cc_home_feed');
        if (saved) setPosts(JSON.parse(saved));
      } catch {}
    };
    window.addEventListener('storage', handleSync);
    return () => window.removeEventListener('storage', handleSync);
  }, []);

  return (
    <div className="hm-page">
      {/* ── Ambient Background Glows ── */}
      <div className="hm-ambient-glow left-glow" />
      <div className="hm-ambient-glow right-glow" />

      {/* ── Sticky Luxury Header ── */}
      <header className="hm-header">
        <div className="hm-header-left" onClick={() => navigate('/home')}>
          <div className="hm-logo-badge-icon">🏎️</div>
          <span className="hm-brand-text">CarConnect</span>
        </div>
        <div className="hm-header-right">
          <button className="hm-hdr-icon-btn" aria-label="Notifications" onClick={() => navigate('/notifications')}>
            <span className="hm-btn-icon">🔔</span>
          </button>
          <button className="hm-hdr-icon-btn" aria-label="Search" onClick={() => navigate('/explore')}>
            <span className="hm-btn-icon">🔍</span>
          </button>
        </div>
      </header>

      {/* ── Scrollable Feed ── */}
      <div className="hm-feed">

        {/* Stories Row with Glowing Rings */}
        <div className="hm-stories">
          {STORIES_DATA.map((s) => (
            <div 
              key={s.id} 
              className="hm-story-item"
              onClick={() => setActiveStory(s)}
            >
              <div className="hm-story-img-wrapper">
                <img src={s.img} alt={s.label} className="hm-story-crop-img" />
                {s.isAdd && <div className="hm-add-story-plus">+</div>}
              </div>
              <span className="hm-story-indicator-bar" />
            </div>
          ))}
        </div>

        {/* Dynamic Posts */}
        <div className="hm-posts">
          {posts.map((post, idx) => (
            <PostCard
              key={post._id || idx}
              post={post}
            />
          ))}
        </div>

      </div>

      {/* ── FULLSCREEN INTERACTIVE STORY VIEWER MODAL ── */}
      {activeStory && (
        <div className="story-viewer-overlay" onClick={() => setActiveStory(null)}>
          <div className="story-viewer-modal" onClick={(e) => e.stopPropagation()}>
            <img src={activeStory.img} alt="Story" className="story-bg-media" />
            
            {/* Top Progress Bar */}
            <div className="story-progress-bar">
              <span className="story-progress-fill" />
            </div>

            {/* Header info */}
            <div className="story-hdr">
              <div className="story-user-info">
                <img src={activeStory.img} alt="" className="story-avatar" />
                <div className="story-user-text">
                  <span className="story-name">{activeStory.name}</span>
                  <span className="story-vehicle">🚗 {activeStory.vehicle}</span>
                </div>
              </div>

              <button className="story-close-btn" onClick={() => setActiveStory(null)}>✕</button>
            </div>

            {/* Bottom Quick Reaction Controls */}
            <div className="story-bottom-bar">
              <input type="text" className="story-reply-input" placeholder="Reply to story..." />
              <button className="story-rxn-btn">❤️</button>
              <button className="story-rxn-btn">🔥</button>
              <button className="story-rxn-btn">🚀</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Bottom Nav (Untouched) ── */}
      <BottomNav />
    </div>
  );
};

export { Home };
export default Home;
