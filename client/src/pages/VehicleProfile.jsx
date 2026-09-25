import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { GradientButton } from '../components/ui/GradientButton';
import { VerifiedBadge } from '../components/ui/VerifiedBadge';
import { Avatar } from '../components/ui/Avatar';
import './VehicleProfile.css';

export const VehicleProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="vp-page anim-fade-in">
      <Header showBack title="Vehicle Info" />
      <div className="vp-hero" />
      
      <div className="vp-content">
        <div className="vp-header">
          <h1 className="vp-title">Ford Mustang GT <VerifiedBadge /></h1>
          <div className="vp-reg">UP 14 AB 0001</div>
        </div>

        <div className="vp-specs">
          <div className="spec"><span>Year</span>2021</div>
          <div className="spec"><span>Fuel</span>Petrol</div>
          <div className="spec"><span>Type</span>Coupe</div>
        </div>

        <div className="vp-owner">
          <Avatar size="sm" name="Owner" />
          <div className="vp-owner-info">
            <div style={{fontWeight: 600}}>Owner Name</div>
            <div style={{fontSize: '12px', color: 'var(--text-muted)'}}>Verified Owner</div>
          </div>
          <button className="vp-follow-btn">Follow</button>
        </div>

        <GradientButton onClick={() => navigate('/booking')} className="mt-4">
          Book This Car
        </GradientButton>
      </div>
    </div>
  );
};
