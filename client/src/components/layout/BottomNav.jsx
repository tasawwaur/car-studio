import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './BottomNav.css';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getTab = () => {
    const path = location.pathname;
    if (path.startsWith('/explore')) return 'explore';
    if (path.startsWith('/inbox')) return 'inbox';
    if (path.startsWith('/profile')) return 'profile';
    return 'home';
  };

  const activeTab = getTab();

  return (
    <div className="bottom-nav-wrapper">
      <div className="bottom-nav-pill">
        {/* Home Tab */}
        <div
          className={`nav-tab-item ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => navigate('/home')}
        >
          <div className="icon-frame">
            <span className="nav-emoji">🏠</span>
          </div>
          <span className="nav-label">Home</span>
          {activeTab === 'home' && <div className="active-line-indicator" />}
        </div>

        {/* Explore Tab */}
        <div
          className={`nav-tab-item ${activeTab === 'explore' ? 'active' : ''}`}
          onClick={() => navigate('/explore')}
        >
          <div className="icon-frame">
            <span className="nav-emoji">🔍</span>
          </div>
          <span className="nav-label">Explore</span>
          {activeTab === 'explore' && <div className="active-line-indicator" />}
        </div>

        {/* Center Create Button (+ Button) */}
        <div className="nav-tab-item center-plus-item" onClick={() => navigate('/create')}>
          <div className="plus-btn-circle">
            <span className="plus-icon">+</span>
          </div>
        </div>

        {/* Inbox Tab */}
        <div
          className={`nav-tab-item ${activeTab === 'inbox' ? 'active' : ''}`}
          onClick={() => navigate('/inbox')}
        >
          <div className="icon-frame badge-relative">
            <span className="nav-emoji">💬</span>
            <span className="notification-badge">1</span>
          </div>
          <span className="nav-label">Inbox</span>
          {activeTab === 'inbox' && <div className="active-line-indicator" />}
        </div>

        {/* Profile Tab */}
        <div
          className={`nav-tab-item ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => navigate('/profile')}
        >
          <div className="icon-frame">
            <span className="nav-emoji">👤</span>
          </div>
          <span className="nav-label">Profile</span>
          {activeTab === 'profile' && <div className="active-line-indicator" />}
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
export { BottomNav };
