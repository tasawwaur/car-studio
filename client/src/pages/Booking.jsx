import React from 'react';
import Header from '../components/layout/Header';
import BottomNav from '../components/layout/BottomNav';
import './Booking.css';

const Booking = () => {
  return (
    <div className="booking-page pb-nav">
      <Header 
        leftContent={<h1 className="header-title">Book a Car</h1>}
        showNotif={false}
        showSearch={false}
      />
      
      <main className="booking-content pt-header">
        <div className="toggle-pills">
          <div className="pill active-gradient">Self Drive</div>
          <div className="pill">With Driver</div>
        </div>

        <div className="booking-form">
          <div className="form-card">
            <span className="icon">📍</span>
            <div className="form-info">
              <span className="label">Pickup Location</span>
              <span className="value">Saharanpur</span>
            </div>
          </div>

          <div className="form-card">
            <span className="icon">📅</span>
            <div className="form-info">
              <span className="label">Pickup Date & Time</span>
              <span className="value">25 Sep 2026    10:00 AM</span>
            </div>
          </div>

          <div className="form-card">
            <span className="icon">📅</span>
            <div className="form-info">
              <span className="label">Drop Date & Time</span>
              <span className="value">27 Sep 2026    10:00 AM</span>
            </div>
          </div>

          <div className="form-card">
            <span className="icon">🚗</span>
            <div className="form-info">
              <span className="label">Car Type</span>
              <span className="value">SUV ▼</span>
            </div>
          </div>

          <button className="btn-primary-gradient w-full mt-16">
            Search Cars &rarr;
          </button>
        </div>

        <section className="popular-cars mt-24">
          <div className="section-header">
            <h2>Popular Cars</h2>
            <span className="see-all">See All</span>
          </div>
          <div className="horizontal-scroll gap-12 mt-12">
            <div className="vehicle-card">
              <div className="vehicle-img-placeholder">🚙</div>
              <span className="v-name">Thar</span>
              <span className="v-price">₹3,500/day</span>
            </div>
            <div className="vehicle-card">
              <div className="vehicle-img-placeholder">🚗</div>
              <span className="v-name">Creta</span>
              <span className="v-price">₹2,500/day</span>
            </div>
            <div className="vehicle-card">
              <div className="vehicle-img-placeholder">🚓</div>
              <span className="v-name">Fortuner</span>
              <span className="v-price">₹4,500/day</span>
            </div>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
};


export { Booking };
