import React from 'react';
import './Stories.css';

const Stories = () => {
  return (
    <div className="stories-container">
      <div className="story-item">
        <div className="story-ring active">
          <img src="https://ui-avatars.com/api/?name=ME&background=4F46E5&color=fff" alt="Your Story" className="story-avatar" />
          <div className="add-story-icon">+</div>
        </div>
        <span className="story-label">Your Story</span>
      </div>

      <div className="story-item">
        <div className="story-ring active">
          <img src="https://ui-avatars.com/api/?name=NY&background=101827&color=fff" alt="Next You" className="story-avatar" />
        </div>
        <span className="story-label">Next You</span>
      </div>

      <div className="story-item">
        <div className="story-ring active">
          <div className="story-avatar placeholder">🔥</div>
        </div>
        <span className="story-label">Trending</span>
      </div>

      <div className="story-item">
        <div className="story-ring active">
          <div className="story-avatar placeholder">🚙</div>
        </div>
        <span className="story-label">Creta</span>
      </div>

      <div className="story-item">
        <div className="story-ring">
          <div className="story-avatar placeholder">🚗</div>
        </div>
        <span className="story-label">Thar</span>
      </div>
    </div>
  );
};

export default Stories;

export { Stories };
