import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import './VehicleCheck.css';

export const VehicleCheck = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 800);
    const t2 = setTimeout(() => setStep(2), 1600);
    const t3 = setTimeout(() => setStep(3), 2400);
    const t4 = setTimeout(() => navigate('/onboarding/otp', { state: location.state }), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [navigate, location]);

  return (
    <div className="check-page">
      <div className="loader-ring" />
      <div className="check-list">
        <div className={`check-item ${step >= 1 ? 'active' : ''}`}>
          <CheckCircle2 color={step >= 1 ? 'var(--success)' : 'var(--text-muted)'} />
          <span>Vehicle record found</span>
        </div>
        <div className={`check-item ${step >= 2 ? 'active' : ''}`}>
          <CheckCircle2 color={step >= 2 ? 'var(--success)' : 'var(--text-muted)'} />
          <span>Owner name matched</span>
        </div>
        <div className={`check-item ${step >= 3 ? 'active' : ''}`}>
          <CheckCircle2 color={step >= 3 ? 'var(--success)' : 'var(--text-muted)'} />
          <span>Generating OTP...</span>
        </div>
      </div>
    </div>
  );
};
