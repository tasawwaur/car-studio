import React from 'react';
import Header from '../components/layout/Header';
import BottomNav from '../components/layout/BottomNav';
import './Profile.css';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="profile-page pb-nav">
      <Header 
        showBack={true}
        leftContent={<span className="header-username">@tasavvur_malik</span>}
        rightContent={<button className="edit-btn-small">Edit</button>}
      />

      <main className="profile-content pt-header">
        <div className="cover-banner"></div>
        
        <div className="profile-info-section">
          <div className="profile-top-row">
            <div className="profile-avatar-wrapper">
              <img src="https://ui-avatars.com/api/?name=TM&background=4F46E5&color=fff" alt="Tasavvur Malik" className="profile-avatar-img" />
            </div>
            <button className="edit-profile-btn">Edit Profile</button>
          </div>

          <div className="user-details mt-12">
            <h1 className="user-name">
              Tasavvur Malik <span className="verified-badge">✓</span>
            </h1>
            <p className="user-handle">@tasavvur_malik</p>
            <p className="user-bio mt-8">Car enthusiast | Travel | Photography</p>
            <p className="user-location mt-4">📍 Saharanpur, Uttar Pradesh</p>
            
            <div className="vehicle-badge mt-12">
              <span className="green-dot">●</span>
              UP 11 AB 1234 <span className="verified-text">✓ Verified Vehicle 🛡️</span>
            </div>
          </div>

          <div className="stats-row mt-24">
            <div className="stat-box">
              <span className="stat-num">124</span>
              <span className="stat-label">Posts</span>
            </div>
            <div className="stat-box">
              <span className="stat-num">1,250</span>
              <span className="stat-label">Followers</span>
            </div>
            <div className="stat-box">
              <span className="stat-num">382</span>
              <span className="stat-label">Following</span>
            </div>
          </div>
        </div>

        <div className="profile-tabs mt-24">
          <div className="tab active-tab">Posts</div>
          <div className="tab">Reels</div>
          <div className="tab">Vehicles</div>
        </div>

        <div className="photo-grid">
          <div className="grid-item">🚗</div>
          <div className="grid-item">🏔️</div>
          <div className="grid-item">🚙</div>
          <div className="grid-item">🛣️</div>
          <div className="grid-item">🚓</div>
          <div className="grid-item">🌅</div>
        </div>
      </main>

      <BottomNav activeTab="profile" />
    </div>
  );
};


export { Profile };
