import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Inbox.css';

const Inbox = () => {
  const navigate = useNavigate();

  return (
    <div className="hm-container">
      <div className="hm-background"></div>

      {/* Interactive 100% Transparent Bottom Navigation Bar Overlay */}
      <div className="hm-bottom-nav">
        {/* Tab 1: Home */}
        <button
          className="hm-nav-btn"
          aria-label="Home"
          onClick={() => navigate('/home')}
        />

        {/* Tab 2: Explore */}
        <button
          className="hm-nav-btn"
          aria-label="Explore"
          onClick={() => navigate('/explore')}
        />

        {/* Tab 3: Center Plus Action (+ Button) */}
        <button
          className="hm-nav-btn hm-center-btn"
          aria-label="Create Post"
          onClick={() => navigate('/create')}
        />

        {/* Tab 4: Inbox */}
        <button
          className="hm-nav-btn active"
          aria-label="Inbox"
          onClick={() => navigate('/inbox')}
        />

        {/* Tab 5: Profile */}
        <button
          className="hm-nav-btn"
          aria-label="Profile"
          onClick={() => navigate('/profile')}
        />
      </div>
    </div>
  );
};

export { Inbox };
