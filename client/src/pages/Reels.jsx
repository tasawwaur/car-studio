import React from 'react';
import BottomNav from '../components/layout/BottomNav';
import './Reels.css';

const Reels = () => {
  return (
    <div className="reels-page">
      <div className="reels-container">
        {/* Left Reel Card equivalent / Reel Player */}
        <div className="reel-player">
          <div className="reel-media-placeholder">
            <span className="reel-emoji">🏔️🚗</span>
          </div>

          <div className="reel-overlay">
            <div className="reel-right-sidebar">
              <div className="sidebar-item">
                <div className="reel-avatar">
                  <img src="https://ui-avatars.com/api/?name=CE&background=4F46E5&color=fff" alt="avatar" />
                </div>
                <span className="follow-btn-small">Follow</span>
              </div>
              <div className="sidebar-item">
                <span className="icon">❤️</span>
                <span className="count">12.5k</span>
              </div>
              <div className="sidebar-item">
                <span className="icon">💬</span>
                <span className="count">420</span>
              </div>
              <div className="sidebar-item">
                <span className="icon">➡️</span>
                <span className="count">1.3k</span>
              </div>
              <div className="sidebar-item">
                <span className="icon">🔖</span>
              </div>
              <div className="sidebar-item mt-auto">
                <span className="icon spinning-disc">🎵</span>
              </div>
            </div>

            <div className="reel-bottom-info">
              <div className="user-info-row">
                <span className="username">Car_Explorer ✓</span>
                <button className="follow-btn-outline">Follow</button>
              </div>
              <p className="caption">Hills, Roads and Freedom 🏔️</p>
              <p className="hashtags">#thar #mountains #travel #india</p>
              <div className="audio-info">
                <span className="music-icon">🎵</span>
                <span>Original Audio</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomNav activeTab="explore" /> {/* Assuming reels might not have specific bottom nav active or it hides. Mockup says Explore tab might be related, but let's just show nav */}
    </div>
  );
};


export { Reels };
