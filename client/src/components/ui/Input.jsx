import React from 'react';
import './Input.css';

export const Input = ({ label, placeholder, value, onChange, type = 'text', error, icon, rightIcon, disabled, className = '' }) => (
  <div className={`cc-input-group ${className}`}>
    {label && <label className="cc-input-label">{label}</label>}
    <div className={`cc-input-wrapper ${error ? 'has-error' : ''} ${disabled ? 'is-disabled' : ''}`}>
      {icon && <span className="cc-input-icon left">{icon}</span>}
      <input
        type={type}
        className="cc-input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {rightIcon && <span className="cc-input-icon right">{rightIcon}</span>}
    </div>
    {error && <span className="cc-input-error">{error}</span>}
  </div>
);
