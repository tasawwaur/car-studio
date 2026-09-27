import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './BottomNav.css';

const BottomNav = ({ unreadCount }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const getTab = () => {
    const path = location.pathname;
    if (path.startsWith('/explore')) return 'explore';
    if (path.startsWith('/inbox'))   return 'inbox';
    if (path.startsWith('/profile')) return 'profile';
    if (path.startsWith('/create'))  return 'create';
    return 'home';
  };

  const activeTab = getTab();

  const getLiveUnreadCount = () => {
    if (unreadCount !== undefined) return unreadCount;
    try {
      const saved = localStorage.getItem('cc_conversations');
      if (saved) {
        const conversations = JSON.parse(saved);
        return conversations.reduce((sum, c) => sum + (c.unreadCount || 0), 0);
      }
    } catch {}
    return 18;
  };

  const liveUnread = getLiveUnreadCount();

  return (
    <div className="bottom-nav-wrapper">
      <div className="golden-nav-container">
        <div className="golden-nav-base">
          <div className="golden-nav-hitboxes">
            {/* 1. Home */}
            <button 
              className={`golden-hitbox ${activeTab === 'home' ? 'active' : ''}`}
              onClick={() => navigate('/home')}
              title="Home"
              aria-label="Home"
            >
              <div className="nav-icon-circle">
                <span className="nav-emoji">🏠</span>
              </div>
              <span className="nav-label">Home</span>
              {activeTab === 'home' && <span className="active-indicator" />}
            </button>

            {/* 2. Explore */}
            <button 
              className={`golden-hitbox ${activeTab === 'explore' ? 'active' : ''}`}
              onClick={() => navigate('/explore')}
              title="Explore"
              aria-label="Explore"
            >
              <div className="nav-icon-circle">
                <span className="nav-emoji">🔍</span>
              </div>
              <span className="nav-label">Explore</span>
              {activeTab === 'explore' && <span className="active-indicator" />}
            </button>

            {/* 3. Center Plus Button */}
            <button 
              className={`golden-hitbox center-plus-hitbox ${activeTab === 'create' ? 'active' : ''}`}
              onClick={() => navigate('/create')}
              title="Create Post"
              aria-label="Create Post"
            >
              <div className="center-plus-orb">
                <span className="plus-symbol">+</span>
              </div>
            </button>

            {/* 4. Inbox */}
            <button 
              className={`golden-hitbox ${activeTab === 'inbox' ? 'active' : ''}`}
              onClick={() => navigate('/inbox')}
              title="Inbox"
              aria-label="Inbox"
            >
              <div className="nav-icon-circle">
                <span className="nav-emoji">💬</span>
                {liveUnread > 0 && (
                  <span className="inbox-badge">
                    {liveUnread > 99 ? '99+' : liveUnread}
                  </span>
                )}
              </div>
              <span className="nav-label">Inbox</span>
              {activeTab === 'inbox' && <span className="active-indicator" />}
            </button>

            {/* 5. Profile */}
            <button 
              className={`golden-hitbox ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => navigate('/profile')}
              title="Profile"
              aria-label="Profile"
            >
              <div className="nav-icon-circle">
                <span className="nav-emoji">👤</span>
              </div>
              <span className="nav-label">Profile</span>
              {activeTab === 'profile' && <span className="active-indicator" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
export { BottomNav };
