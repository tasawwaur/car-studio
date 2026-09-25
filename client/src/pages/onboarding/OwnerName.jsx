import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/globals.css';

const OwnerName = () => {
  const navigate = useNavigate();

  return (
    <div className="onboarding-container page-container">
      <div className="onboarding-header">
        <div className="step-progress">
          <div className="step completed"><span className="dot">✓</span> Vehicle</div>
          <div className="step-line active-line"></div>
          <div className="step active"><span className="dot">●</span> Owner</div>
          <div className="step-line"></div>
          <div className="step"><span className="dot">○</span> Verify</div>
          <div className="step-line"></div>
          <div className="step"><span className="dot">○</span> Profile</div>
        </div>
        <button className="skip-link" onClick={() => navigate('/home')}>Skip</button>
      </div>

      <div className="onboarding-content">
        <h1 className="page-title">Enter Your Name</h1>
        <p className="page-subtitle">As per vehicle official records</p>

        <div className="input-group">
          <span className="input-icon">👤</span>
          <input type="text" placeholder="Mohammad Tasawwar" defaultValue="Mohammad Tasawwar" className="text-input" />
        </div>

        <button className="btn-primary-gradient mt-24" onClick={() => navigate('/onboarding/verify')}>
          Verify Details
        </button>

        <div className="info-card mt-32">
          <div className="card-header-icon">
            <span className="shield-icon">🛡️</span>
            <h3 className="card-heading">Official Records Verification</h3>
          </div>
          <p className="card-text mt-12">
            We verify your details from government vehicle records. Your data is 100% secure.
          </p>
        </div>
      </div>
    </div>
  );
};


export { OwnerName };
