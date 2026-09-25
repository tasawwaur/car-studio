import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Splash.css';

const Splash = () => {
  const navigate = useNavigate();

  return (
    <div className="splash-container">
      <div className="splash-background"></div>
      
      <div className="splash-content">
        <div className="splash-top-space"></div>

        <div className="splash-bottom-actions">
          <button 
            className="btn-primary-gradient" 
            aria-label="Get Started" 
            onClick={() => navigate('/onboarding/vehicle-number')} 
          />
          
          <button 
            className="btn-ghost" 
            aria-label="Sign In" 
            onClick={() => navigate('/login')} 
          />
        </div>
      </div>
    </div>
  );
};


export { Splash };
