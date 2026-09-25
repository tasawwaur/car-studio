import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/globals.css';

const VehicleNumber = () => {
  const navigate = useNavigate();

  return (
    <div className="onboarding-container page-container">
      <div className="onboarding-header">
        <div className="step-progress">
          <div className="step active"><span className="dot">●</span> Vehicle</div>
          <div className="step-line"></div>
          <div className="step"><span className="dot">○</span> Owner</div>
          <div className="step-line"></div>
          <div className="step"><span className="dot">○</span> Verify</div>
          <div className="step-line"></div>
          <div className="step"><span className="dot">○</span> Profile</div>
        </div>
        <button className="skip-link" onClick={() => navigate('/home')}>Skip</button>
      </div>

      <div className="onboarding-content">
        <h1 className="page-title">Enter Your Vehicle Number</h1>
        <p className="page-subtitle">We'll check official records to verify ownership</p>

        <div className="number-plate-input">
          <div className="ind-badge">
            <span className="flag">🇮🇳</span>
            <span className="ind-text">IND</span>
          </div>
          <input type="text" placeholder="UP 11 AB 1234" defaultValue="UP 11 AB 1234" />
        </div>

        <button className="btn-primary-gradient mt-24" onClick={() => navigate('/onboarding/owner')}>
          Check Vehicle &rarr;
        </button>

        <div className="car-placeholder">
          🚗
        </div>

        <div className="info-card">
          <h3 className="card-heading">✅ Official Verification</h3>
          <ul className="checklist">
            <li>✓ RTO Vehicle Records</li>
            <li>✓ Owner Name Match</li>
            <li>✓ Aadhaar Linked Mobile OTP</li>
            <li>✓ 100% Secure & Private</li>
          </ul>
        </div>
      </div>
    </div>
  );
};


export { VehicleNumber };
