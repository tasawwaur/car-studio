import React from 'react';
import Header from '../components/layout/Header';
import './CreatePost.css';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const navigate = useNavigate();

  return (
    <div className="create-post-page">
      <Header 
        showBack={true}
        leftContent={<h1 className="header-title">Create Post</h1>}
        rightContent={<span className="save-icon">✓</span>}
      />

      <main className="create-post-content pt-header">
        <div className="media-tabs">
          <div className="tab active-tab">Photo</div>
          <div className="tab">Video</div>
          <div className="tab">Reel</div>
          <div className="tab">Text</div>
        </div>

        <div className="image-preview-area">
          <div className="preview-placeholder">
            <span className="emoji-large">🏔️</span>
          </div>
          <button className="close-preview">×</button>
        </div>

        <div className="caption-input-area">
          <textarea 
            placeholder="Mountain vibes 🏔️ #mountains #roadtrip"
            defaultValue="Mountain vibes 🏔️ #mountains #roadtrip"
            rows={3}
          ></textarea>
        </div>

        <div className="post-options">
          <div className="option-row">
            <span className="icon">📍</span>
            <span className="text">Mussoorie, Uttarakhand</span>
          </div>
          <div className="option-row">
            <span className="icon">👥</span>
            <span className="text">Tag People</span>
          </div>
          <div className="option-row">
            <span className="icon">🚗</span>
            <span className="text">UP 11 AB 1234 (Thar)</span>
          </div>
          <div className="option-row border-none">
            <span className="icon">🌍</span>
            <span className="text">Public</span>
          </div>
        </div>

        <div className="post-btn-container">
          <button className="btn-primary-gradient w-full" onClick={() => navigate('/home')}>
            Post
          </button>
        </div>
      </main>
    </div>
  );
};


export { CreatePost };
