import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './Login.css';

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  });

  const handleLogin = (e) => {
    e?.preventDefault();
    login(
      {
        _id: '1',
        name: 'Mohammad Tasawwar',
        email: formData.identifier || 'tasawwar@gmail.com',
        username: 'tasavvur_malik',
        verified: true,
        vehicleNumber: 'UP 11 AB 1234'
      },
      'car_connect_login_token'
    );
    navigate('/home');
  };

  const handleSocialLogin = (provider) => {
    login(
      {
        _id: '1',
        name: `${provider} User`,
        email: `user@${provider.toLowerCase()}.com`,
        username: `${provider.toLowerCase()}_user`,
        verified: true
      },
      'social_login_token'
    );
    navigate('/home');
  };

  return (
    <div className="lg-container">
      <div className="lg-background"></div>

      {/* Top back button over poster image */}
      <button className="lg-back-btn" aria-label="Back" onClick={() => navigate('/onboarding/vehicle-number')} />

      {/* Interactive Form overlaying poster login card */}
      <form onSubmit={handleLogin} className="lg-form">
        {/* Row 1: Email / Mobile Input (✉️) */}
        <div className="lg-input-row">
          <input
            type="text"
            className="lg-input"
            placeholder="Email address or Phone"
            value={formData.identifier}
            onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
            autoComplete="off"
            autoFocus
          />
        </div>

        {/* Row 2: Password Input (🔒) */}
        <div className="lg-input-row">
          <input
            type="password"
            className="lg-input"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            autoComplete="current-password"
          />
        </div>

        {/* Login Button over poster cyan/purple action button */}
        <button type="submit" className="lg-submit-btn" aria-label="Login" />

        {/* Social Login Row (Google & Facebook gold circle buttons) */}
        <div className="lg-social-row">
          <button
            type="button"
            className="lg-social-btn"
            onClick={() => handleSocialLogin('Google')}
            aria-label="Login with Google"
          />
          <button
            type="button"
            className="lg-social-btn"
            onClick={() => handleSocialLogin('Facebook')}
            aria-label="Login with Facebook"
          />
        </div>

        {/* Sign Up Button over poster gold pill button */}
        <div className="lg-signup-wrapper">
          <button
            type="button"
            className="lg-signup-btn"
            onClick={() => navigate('/onboarding/vehicle-number')}
            aria-label="Sign Up"
          />
        </div>
      </form>
    </div>
  );
};
