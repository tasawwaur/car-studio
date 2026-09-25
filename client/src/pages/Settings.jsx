import React from 'react';
import { Header } from '../components/layout/Header';
import { useAuth } from '../hooks/useAuth';
import './Settings.css';

export const Settings = () => {
  const { logout } = useAuth();

  return (
    <div className="settings-page">
      <Header title="Settings" showBack />
      <div className="s-list">
        <div className="s-section">Account</div>
        <div className="s-item">Edit Profile</div>
        <div className="s-item">Change Password</div>
        
        <div className="s-section">Privacy</div>
        <div className="s-item">Privacy Policy</div>
        
        <div className="s-section" style={{marginTop: '32px'}}>
          <button className="s-logout" onClick={logout}>Log Out</button>
        </div>
      </div>
    </div>
  );
};
