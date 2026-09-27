import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/layout/BottomNav';
import './Explore.css';

/* ── Sample Explore 3x3 Grid Items (Matching Reference) ── */
const EXPLORE_GRID_ITEMS = [
  { id: 'e1', img: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800', type: 'car', title: 'Hypercar Spec' },
  { id: 'e2', img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800', type: 'car', title: 'G-Wagon Night Edition' },
  { id: 'e3', img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800', type: 'car', title: 'BMW M Series' },
  { id: 'e4', img: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800', type: 'bike', title: 'Yamaha R1 Superbike' },
  { id: 'e5', img: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800', type: 'car', title: 'Porsche GT3' },
  { id: 'e6', img: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800', type: 'car', title: 'Audi R8 Coupe' },
  { id: 'e7', img: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=800', type: 'car', title: 'Car Club Meet' },
  { id: 'e8', img: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800', type: 'car', title: 'Ferrari Night Drive' },
  { id: 'e9', img: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800', type: 'car', title: 'BMW Cyberpunk Edition' }
];

const FEATURED_STORIES = [
  { id: 'fs0', img: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=200', isCrown: true, label: 'VIP Spec' },
  { id: 'fs1', img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=200', label: 'Hypercar' },
  { id: 'fs2', img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=200', label: 'Offroad' },
  { id: 'fs3', img: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=200', label: 'Superbike' },
  { id: 'fs4', img: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=200', label: 'Car Meet' },
  { id: 'fs5', img: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=200', label: 'Night Drive' }
];

const Explore = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all'); // 'all' | 'cars' | 'bikes' | 'vip' | 'nearby'
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGrid = EXPLORE_GRID_ITEMS.filter(item => {
    if (activeCategory === 'cars') return item.type === 'car';
    if (activeCategory === 'bikes') return item.type === 'bike';
    return true;
  });

  return (
    <div className="xp-page">

      {/* ── Sticky Luxury Header Bar ── */}
      <header className="xp-header">
        <button className="xp-hdr-round-btn" aria-label="Search Action">
          🔍
        </button>

        {/* Pill Search Bar */}
        <div className="xp-search-bar">
          <span className="xp-search-icon">🔍</span>
          <input 
            type="text" 
            className="xp-search-input" 
            placeholder="Search cars, drivers, events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filter Sliders Button */}
        <button className="xp-hdr-round-btn" aria-label="Filter Options">
          🎛️
        </button>
      </header>

      {/* ── Main Scroll Area ── */}
      <div className="xp-content">

        {/* Trending Stories Row */}
        <div className="xp-stories-row">
          {FEATURED_STORIES.map(s => (
            <div key={s.id} className="xp-story-item">
              <div className="xp-story-ring">
                {s.isCrown && <img src="/gold-crown.png" alt="Crown" className="xp-crown-icon" />}
                <img src={s.img} alt={s.label} className="xp-story-img" />
              </div>
              <span className="xp-story-accent-bar" />
            </div>
          ))}
        </div>

        {/* 5 Category Filter Tabs */}
        <div className="xp-category-tabs">
          <button 
            className={`xp-cat-btn ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
            title="Grid View / All"
          >
            <span>⊞</span>
          </button>

          <button 
            className={`xp-cat-btn ${activeCategory === 'cars' ? 'active' : ''}`}
            onClick={() => setActiveCategory('cars')}
            title="Cars"
          >
            <span>🚗</span>
          </button>

          <button 
            className={`xp-cat-btn ${activeCategory === 'bikes' ? 'active' : ''}`}
            onClick={() => setActiveCategory('bikes')}
            title="Superbikes"
          >
            <span>🏍️</span>
          </button>

          <button 
            className={`xp-cat-btn ${activeCategory === 'vip' ? 'active' : ''}`}
            onClick={() => setActiveCategory('vip')}
            title="VIP Spec"
          >
            <span>👑</span>
          </button>

          <button 
            className={`xp-cat-btn ${activeCategory === 'nearby' ? 'active' : ''}`}
            onClick={() => setActiveCategory('nearby')}
            title="Nearby Events"
          >
            <span>📍</span>
          </button>
        </div>

        {/* Explore 3x3 Photo Grid */}
        <div className="xp-posts-grid">
          {filteredGrid.map(item => (
            <div key={item.id} className="xp-grid-item" onClick={() => navigate(`/post/${item.id}`)}>
              <img src={item.img} alt={item.title} className="xp-grid-img" />
              {/* Checkbox overlay badge on top-right corner of each thumbnail */}
              <div className="xp-grid-checkbox">☐</div>
            </div>
          ))}
        </div>

      </div>

      {/* ── Bottom Nav with "Post Now" Badge ── */}
      <BottomNav showPostBadge={true} />
    </div>
  );
};

export default Explore;
export { Explore };
