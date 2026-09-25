import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/globals.css';

const OtpVerify = () => {
  const navigate = useNavigate();

  return (
    <div className="onboarding-container page-container">
      <div className="onboarding-header">
        <div className="step-progress">
          <div className="step completed"><span className="dot">✓</span> Vehicle</div>
          <div className="step-line active-line"></div>
          <div className="step completed"><span className="dot">✓</span> Owner</div>
          <div className="step-line active-line"></div>
          <div className="step active"><span className="dot">●</span> Verify</div>
          <div className="step-line"></div>
          <div className="step"><span className="dot">○</span> Profile</div>
        </div>
      </div>

      <div className="onboarding-content text-center">
        <h1 className="page-title mt-24">Verify with OTP</h1>
        <p className="page-subtitle">We've sent a 6-digit OTP to your Aadhaar linked mobile number</p>
        <p className="bold-phone mt-8">+91 98XXXX4321</p>

        <div className="otp-container mt-32">
          <input type="text" className="otp-box" defaultValue="2" maxLength={1} />
          <input type="text" className="otp-box" defaultValue="5" maxLength={1} />
          <input type="text" className="otp-box" defaultValue="8" maxLength={1} />
          <input type="text" className="otp-box" defaultValue="4" maxLength={1} />
          <input type="text" className="otp-box" defaultValue="1" maxLength={1} />
          <input type="text" className="otp-box" defaultValue="9" maxLength={1} />
        </div>

        <p className="resend-text mt-24">Resend OTP in <span className="countdown">00:30</span></p>

        <button className="btn-primary-gradient mt-32" onClick={() => navigate('/home')}>
          Verify & Continue
        </button>

        <div className="info-card mt-32 text-left">
          <div className="card-header-icon">
            <span className="shield-icon">🔒</span>
            <h3 className="card-heading">Secure Verification</h3>
          </div>
          <p className="card-text mt-12">
            OTP is sent to Aadhaar linked mobile number as per official records
          </p>
        </div>
      </div>
    </div>
  );
};


export { OtpVerify };
