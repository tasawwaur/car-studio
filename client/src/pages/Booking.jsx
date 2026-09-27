import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/layout/BottomNav';
import './Booking.css';

const Booking = () => {
  const navigate = useNavigate();
  const [driveMode, setDriveMode] = useState('self'); // 'self' | 'driver'

  return (
    <div className="bk-page">
      {/* ── Top Header ── */}
      <header className="bk-header">
        <button className="bk-back-btn" onClick={() => navigate(-1)}>←</button>
        <h1 className="bk-title">Book a Car</h1>
      </header>

      {/* ── Main Content ── */}
      <div className="bk-content">

        {/* Segmented Control Toggle */}
        <div className="bk-toggle-pills">
          <button 
            className={`bk-pill ${driveMode === 'self' ? 'active' : ''}`}
            onClick={() => setDriveMode('self')}
          >
            Self Drive
          </button>
          <button 
            className={`bk-pill ${driveMode === 'driver' ? 'active' : ''}`}
            onClick={() => setDriveMode('driver')}
          >
            With Driver
          </button>
        </div>

        {/* Booking Form Cards */}
        <div className="bk-form">
          {/* Pickup Location Card */}
          <div className="bk-form-card">
            <span className="bk-card-icon">📍</span>
            <div className="bk-card-info">
              <span className="bk-card-label">Pickup Location</span>
              <span className="bk-card-val">Saharanpur</span>
            </div>
          </div>

          {/* Pickup Date & Time Card */}
          <div className="bk-form-card">
            <span className="bk-card-icon">📅</span>
            <div className="bk-card-info">
              <span className="bk-card-label">Pickup Date & Time</span>
              <span className="bk-card-val">25 Sep 2026 &nbsp;&nbsp; 10:00 AM</span>
            </div>
          </div>

          {/* Drop Date & Time Card */}
          <div className="bk-form-card">
            <span className="bk-card-icon">📅</span>
            <div className="bk-card-info">
              <span className="bk-card-label">Drop Date & Time</span>
              <span className="bk-card-val">27 Sep 2026 &nbsp;&nbsp; 10:00 AM</span>
            </div>
          </div>

          {/* Car Type Card */}
          <div className="bk-form-card">
            <span className="bk-card-icon">🚗</span>
            <div className="bk-card-info">
              <span className="bk-card-label">Car Type</span>
              <span className="bk-card-val">SUV</span>
            </div>
          </div>

          {/* Search Button */}
          <button className="bk-search-btn">
            Search Cars →
          </button>
        </div>

        {/* Popular Cars Section */}
        <div className="bk-popular-sec">
          <div className="bk-sec-hdr">
            <h2 className="bk-sec-title">Popular Cars</h2>
            <span className="bk-see-all">See All</span>
          </div>

          <div className="bk-cars-grid">
            <div className="bk-car-card" onClick={() => navigate('/booking/v1')}>
              <img src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400" alt="Thar" className="bk-car-thumb" />
              <div className="bk-car-meta">
                <span className="bk-car-name">Thar</span>
                <span className="bk-car-price">₹3,500/day</span>
              </div>
            </div>

            <div className="bk-car-card" onClick={() => navigate('/booking/v2')}>
              <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400" alt="Creta" className="bk-car-thumb" />
              <div className="bk-car-meta">
                <span className="bk-car-name">Creta</span>
                <span className="bk-car-price">₹2,600/day</span>
              </div>
            </div>

            <div className="bk-car-card" onClick={() => navigate('/booking/v3')}>
              <img src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=400" alt="Fortuner" className="bk-car-thumb" />
              <div className="bk-car-meta">
                <span className="bk-car-name">Fortuner</span>
                <span className="bk-car-price">₹4,500/day</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <BottomNav />
    </div>
  );
};

export default Booking;
export { Booking };
