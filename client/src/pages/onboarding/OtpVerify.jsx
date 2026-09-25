import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './OtpVerify.css';

const OtpVerify = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    navigate('/onboarding/profile-setup');
  };

  return (
    <div className="ov-container">
      <div className="ov-background"></div>

      {/* Top action buttons over poster image */}
      <button className="ov-back-btn" aria-label="Back" onClick={() => navigate('/onboarding/owner-name')} />
      <button className="ov-skip-btn" aria-label="Skip" onClick={() => navigate('/login')} />

      {/* Interactive OTP Input Form */}
      <form onSubmit={handleSubmit} className="ov-form">
        <div className="ov-boxes-row">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => (inputRefs.current[idx] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              className="ov-digit-input"
              value={digit}
              placeholder="-"
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              autoFocus={idx === 0}
            />
          ))}
        </div>

        {/* Verify OTP button over poster button */}
        <button type="submit" className="ov-verify-btn" aria-label="Verify OTP" />
      </form>
    </div>
  );
};

export { OtpVerify };
