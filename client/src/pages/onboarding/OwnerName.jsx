import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './OwnerName.css';

const OwnerName = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const regNumber = location.state?.regNumber || 'UP 11 AB 1234';
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    dob: '',
    aadhaar: ''
  });

  const handleContinue = (e) => {
    e?.preventDefault();
    navigate('/onboarding/otp', {
      state: {
        regNumber,
        name: formData.name || 'Mohammad Tasawwar',
        phone: formData.phone || '+91 98370 12345'
      }
    });
  };

  return (
    <div className="on-container">
      <div className="on-background"></div>

      {/* Top action buttons over poster image */}
      <button className="on-back-btn" aria-label="Back" onClick={() => navigate('/onboarding/vehicle-number')} />
      <button className="on-skip-btn" aria-label="Skip" onClick={() => navigate('/login')} />

      {/* Interactive Form overlaying poster input card */}
      <form onSubmit={handleContinue} className="on-form">
        {/* Field 1: Owner Name (👤) */}
        <div className="on-input-row">
          <input
            type="text"
            className="on-input"
            placeholder="Mohammad Tasawwar"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            autoFocus
          />
        </div>

        {/* Field 2: Mobile Number (📞) */}
        <div className="on-input-row">
          <input
            type="tel"
            className="on-input"
            placeholder="+91 98370 12345"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        {/* Field 3: Date of Birth (📅) */}
        <div className="on-input-row">
          <input
            type="text"
            className="on-input"
            placeholder="DD / MM / YYYY"
            value={formData.dob}
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
          />
        </div>

        {/* Field 4: Aadhaar Card Number (🪪) */}
        <div className="on-input-row">
          <input
            type="text"
            className="on-input"
            placeholder="1234  5678  9012"
            maxLength={14}
            value={formData.aadhaar}
            onChange={(e) => setFormData({ ...formData, aadhaar: e.target.value })}
          />
        </div>

        {/* Continue Button over poster button */}
        <button type="submit" className="on-continue-btn" aria-label="Continue" />
      </form>
    </div>
  );
};

export { OwnerName };
