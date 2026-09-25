import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ title, leftContent, showBack, showNotif, showSearch, rightContent }) => {
  const navigate = useNavigate();

  return (
    <header className="app-header">
      <div className="header-left">
        {showBack && (
          <button className="back-btn" onClick={() => navigate(-1)}>
            ←
          </button>
        )}
        {leftContent}
        {title && <h1 className="header-title">{title}</h1>}
      </div>

      <div className="header-right">
        {showSearch && <span className="header-icon">🔍</span>}
        {showNotif && (
          <div className="notif-wrapper">
            <span className="header-icon">🔔</span>
            <span className="notif-badge"></span>
          </div>
        )}
        {rightContent}
      </div>
    </header>
  );
};

export default Header;

export { Header };
