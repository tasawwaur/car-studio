import React from 'react';
import './PostCard.css';

const PostCard = ({ user, location, time, mediaPlaceholder, caption, likes, comments, shares, pageCount }) => {
  return (
    <div className="post-card">
      <div className="post-header">
        <div className="user-info">
          <img src={user.avatar} alt={user.name} className="avatar" />
          <div className="name-loc">
            <span className="user-name">{user.name}</span>
            <span className="time-loc">{time} • {location}</span>
          </div>
        </div>
        <button className="follow-btn">Follow</button>
      </div>

      <div className="post-media" style={{ background: mediaPlaceholder.gradient }}>
        <div className="media-content">
          <span className="media-emoji">{mediaPlaceholder.emoji}</span>
        </div>
        {pageCount && <div className="page-indicator">{pageCount}</div>}
      </div>

      <div className="post-actions">
        <div className="action-left">
          <div className="action-btn">
            <span className="icon">❤️</span>
            <span className="count">{likes}</span>
          </div>
          <div className="action-btn">
            <span className="icon">💬</span>
            <span className="count">{comments}</span>
          </div>
          <div className="action-btn">
            <span className="icon">⬆️</span>
            <span className="count">{shares}</span>
          </div>
        </div>
        <div className="action-right">
          <span className="icon">🔖</span>
        </div>
      </div>

      <div className="post-caption">
        <span className="caption-text">{caption}</span>
      </div>
    </div>
  );
};

export default PostCard;

export { PostCard };
