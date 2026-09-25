import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './ProfileSetup.css';

const ProfileSetup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [gender, setGender] = useState('');
  const [formData, setFormData] = useState({
    dlNumber: '',
    email: '',
    password: ''
  });

  const handleComplete = (e) => {
    e?.preventDefault();
    login(
      {
        _id: '1',
        name: 'Mohammad Tasawwar',
        gender: gender,
        dlNumber: formData.dlNumber || 'DL1420110012345',
        email: formData.email || 'tasawwar@gmail.com',
        username: 'tasavvur_malik',
        verified: true,
        vehicleNumber: 'UP 11 AB 1234'
      },
      'car_connect_verified_token'
    );
    navigate('/home');
  };

  return (
    <div className="ps-container">
      <div className="ps-background"></div>

      {/* Top action buttons over poster image */}
      <button className="ps-back-btn" aria-label="Back" onClick={() => navigate('/onboarding/otp')} />
      <button className="ps-skip-btn" aria-label="Skip" onClick={() => navigate('/login')} />

      {/* Interactive Form overlaying the poster fields */}
      <form onSubmit={handleComplete} className="ps-form">
        {/* Row 1: Gender Radio Selection (Male / Female) */}
        <div className="ps-gender-row">
          <button
            type="button"
            className={`ps-gender-btn male-btn ${gender === 'male' ? 'selected' : ''}`}
            onClick={() => setGender('male')}
            aria-label="Male"
          />

          <button
            type="button"
            className={`ps-gender-btn female-btn ${gender === 'female' ? 'selected' : ''}`}
            onClick={() => setGender('female')}
            aria-label="Female"
          />
        </div>

        {/* Row 2: Driving License Number (🪪) */}
        <div className="ps-input-row">
          <input
            type="text"
            className="ps-input"
            placeholder="DL1420110012345"
            value={formData.dlNumber}
            onChange={(e) => setFormData({ ...formData, dlNumber: e.target.value.toUpperCase() })}
            autoComplete="off"
            autoFocus
          />
        </div>

        {/* Row 3: Email Address (✉️) */}
        <div className="ps-input-row">
          <input
            type="email"
            className="ps-input"
            placeholder="tasawwar@gmail.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            autoComplete="off"
          />
        </div>

        {/* Row 4: Password (🔒) */}
        <div className="ps-input-row">
          <input
            type="password"
            className="ps-input"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            autoComplete="new-password"
          />
        </div>

        {/* Create Profile Button */}
        <button type="submit" className="ps-submit-btn">
          Create Profile
        </button>
      </form>
    </div>
  );
};

export { ProfileSetup };
