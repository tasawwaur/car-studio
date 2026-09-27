import React, { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './CreatePost.css';

const TABS = ['Photo', 'Video', 'Reel', 'Text'];

const CreatePost = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [activeTab, setActiveTab] = useState('Photo');
  const [caption, setCaption] = useState('Mountain vibes 🏔️🚗 #roadtrip #thar #mountains');
  const [location, setLocation] = useState('Mussoorie, Uttarakhand');
  const [vehicle, setVehicle] = useState('UP 11 AB 1234 (Thar)');
  const [privacy, setPrivacy] = useState('Public');
  
  const [mediaPreview, setMediaPreview] = useState(
    'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800'
  );

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setMediaPreview(URL.createObjectURL(file));
    }
  };

  const removeMedia = () => {
    setMediaPreview(null);
  };

  const handlePost = () => {
    const newPost = {
      _id: `post_${Date.now()}`,
      author: {
        _id: user?._id || 'u1',
        name: user?.name || 'Tasavvur Malik',
        username: 'tasavvur_malik',
        isVerified: true,
        vehicleNumber: user?.vehicleNumber || 'UP 11 AB 1234',
        avatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
      },
      mediaUrls: [
        mediaPreview || 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800'
      ],
      mediaType: activeTab === 'Video' || activeTab === 'Reel' ? 'video' : 'image',
      caption: caption || 'New Car Post 🚗✨',
      location: location || 'Saharanpur · India',
      likesCount: 1,
      commentsCount: 0,
      sharesCount: 0,
      createdAt: new Date().toISOString()
    };

    try {
      const savedFeed = localStorage.getItem('cc_home_feed');
      const existing = savedFeed ? JSON.parse(savedFeed) : [
        {
          _id: 'p1',
          author: { 
            _id: 'u1', 
            name: 'Mohammad Tasawwar', 
            username: 'tasawwar_cars', 
            isVerified: true, 
            vehicleNumber: 'UP 11 AB 1234',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
          },
          mediaUrls: [
            'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800',
            'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800'
          ],
          mediaType: 'image',
          caption: 'Future of Hypercars ⚡ Futuristic Design & Pure Horsepower! #hypercar #carconnect #future #drive',
          location: 'Saharanpur · India',
          likesCount: 128,
          commentsCount: 24,
          sharesCount: 18,
          createdAt: new Date().toISOString()
        }
      ];
      const updated = [newPost, ...existing];
      localStorage.setItem('cc_home_feed', JSON.stringify(updated));
    } catch (err) {}

    navigate('/home');
  };

  return (
    <div className="cp-page">
      {/* ── Header ── */}
      <header className="cp-header">
        <button className="cp-back-btn" onClick={() => navigate(-1)}>←</button>
        <h1 className="cp-title">Create Post</h1>
      </header>

      {/* ── Main Content ── */}
      <div className="cp-content">

        {/* Post Type Selector Tabs */}
        <div className="cp-type-tabs">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`cp-tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Media Preview Box */}
        {activeTab !== 'Text' && (
          <div className="cp-media-box">
            {mediaPreview ? (
              <div className="cp-preview-wrap">
                <img src={mediaPreview} alt="Post preview" className="cp-preview-img" />
                <button className="cp-remove-btn" onClick={removeMedia}>✕</button>
              </div>
            ) : (
              <div className="cp-upload-placeholder" onClick={() => fileInputRef.current?.click()}>
                <span className="cp-upload-icon">📷</span>
                <span className="cp-upload-text">Select Photo or Video</span>
              </div>
            )}

            <input 
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*,video/*"
              style={{ display: 'none' }}
            />
          </div>
        )}

        {/* Options List */}
        <div className="cp-options-list">
          {/* Add Caption */}
          <div className="cp-option-item caption-item">
            <span className="cp-opt-icon">📝</span>
            <div className="cp-opt-col">
              <span className="cp-opt-label">Add Caption</span>
              <input 
                type="text" 
                className="cp-opt-input"
                placeholder="Write a caption..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </div>
          </div>

          {/* Add Location */}
          <div className="cp-option-item">
            <span className="cp-opt-icon">📍</span>
            <div className="cp-opt-col">
              <span className="cp-opt-label">Add Location</span>
              <input 
                type="text" 
                className="cp-opt-input"
                placeholder="Mussoorie, Uttarakhand"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <span className="cp-opt-arrow">›</span>
          </div>

          {/* Tag People */}
          <div className="cp-option-item">
            <span className="cp-opt-icon">👤</span>
            <span className="cp-opt-title">Tag People</span>
            <span className="cp-opt-arrow">›</span>
          </div>

          {/* Select Vehicle */}
          <div className="cp-option-item">
            <span className="cp-opt-icon">🚗</span>
            <div className="cp-opt-col">
              <span className="cp-opt-label">Select Vehicle</span>
              <span className="cp-opt-val">🚙 {vehicle}</span>
            </div>
            <span className="cp-opt-arrow">›</span>
          </div>

          {/* Post Privacy */}
          <div className="cp-option-item border-none">
            <span className="cp-opt-icon">🔒</span>
            <div className="cp-opt-col">
              <span className="cp-opt-label">Post Privacy</span>
              <span className="cp-opt-val">{privacy}</span>
            </div>
            <span className="cp-opt-arrow">›</span>
          </div>
        </div>

        {/* Post Submit Button */}
        <button className="cp-post-btn" onClick={handlePost}>
          Post
        </button>

      </div>
    </div>
  );
};

export default CreatePost;
export { CreatePost };
