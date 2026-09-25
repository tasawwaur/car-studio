import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './BottomNav.css';

const BottomNav = ({ activeTab }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab = activeTab || location.pathname.substring(1) || 'home';

  return (
    <div className="bottom-nav">
      <div className={`nav-item ${currentTab === 'home' ? 'active' : ''}`} onClick={() => navigate('/home')}>
        <span className="nav-icon">🏠</span>
        <span className="nav-label">Home</span>
      </div>
      
      <div className={`nav-item ${currentTab === 'explore' ? 'active' : ''}`} onClick={() => navigate('/explore')}>
        <span className="nav-icon">🧭</span>
        <span className="nav-label">Explore</span>
      </div>

      <div className="nav-item center-add" onClick={() => navigate('/create')}>
        <div className="add-button-circle">
          <span className="nav-icon add-icon">+</span>
        </div>
      </div>

      <div className={`nav-item ${currentTab === 'inbox' ? 'active' : ''}`} onClick={() => navigate('/inbox')}>
        <span className="nav-icon">💬</span>
        <span className="nav-label">Inbox</span>
      </div>

      <div className={`nav-item ${currentTab === 'profile' ? 'active' : ''}`} onClick={() => navigate('/profile')}>
        <span className="nav-icon">👤</span>
        <span className="nav-label">Profile</span>
      </div>
    </div>
  );
};

export default BottomNav;

export { BottomNav };
