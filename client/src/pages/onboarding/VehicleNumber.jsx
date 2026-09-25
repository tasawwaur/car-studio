import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './VehicleNumber.css';

const VehicleNumber = () => {
  const navigate = useNavigate();
  const [vehicleNum, setVehicleNum] = useState('');

  const handleSubmit = (e) => {
    e?.preventDefault();
    navigate('/onboarding/owner-name', { state: { regNumber: vehicleNum.toUpperCase() || 'UP 11 AB 1234' } });
  };

  return (
    <div className="vn-container">
      <div className="vn-background"></div>

      {/* Top action buttons over poster image */}
      <button className="vn-back-btn" aria-label="Back" onClick={() => navigate('/')} />
      <button className="vn-skip-btn" aria-label="Skip" onClick={() => navigate('/home')} />

      {/* Input area positioned over poster plate box */}
      <form onSubmit={handleSubmit} className="vn-form">
        <div className="vn-input-wrapper">
          <input
            type="text"
            className="vn-input"
            placeholder="UP 11 AB 1234"
            value={vehicleNum}
            onChange={(e) => setVehicleNum(e.target.value.toUpperCase())}
            maxLength={13}
            autoFocus
          />
        </div>

        {/* Check Vehicle button over poster button */}
        <button type="submit" className="vn-check-btn" aria-label="Check Vehicle" />
      </form>
    </div>
  );
};

export { VehicleNumber };
