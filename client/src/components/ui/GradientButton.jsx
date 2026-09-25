import React from 'react';
import './GradientButton.css';

export const GradientButton = ({ children, onClick, disabled, className = '' }) => (
  <button 
    className={`gradient-btn ${className}`} 
    onClick={onClick} 
    disabled={disabled}
  >
    {children}
  </button>
);
