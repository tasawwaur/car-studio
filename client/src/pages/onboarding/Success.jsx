import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { GradientButton } from '../../components/ui/GradientButton';
import { VehicleBadge } from '../../components/ui/VehicleBadge';
import './Success.css';

export const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="success-page">
      <div className="success-content anim-scale-in">
        <div className="success-icon-wrapper">
          <div className="success-icon-bg pulse" />
          <Check size={40} className="success-icon" />
        </div>
        <h1 className="success-title">Vehicle Verified!</h1>
        <VehicleBadge regNumber="UP 11 AB 1234" className="success-badge" />
        <p className="success-subtitle">Your account is now verified</p>
      </div>
      <div className="success-footer anim-slide-up">
        <GradientButton onClick={() => navigate('/onboarding/profile-setup')}>
          Set Up Profile
        </GradientButton>
      </div>
    </div>
  );
};
