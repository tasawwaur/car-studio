import React from 'react';
import './Button.css';
import { Loader2 } from 'lucide-react';

export const Button = ({ children, onClick, variant = 'primary', size = 'md', loading, disabled, fullWidth, icon, type = 'button', className = '' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`cc-btn btn-${variant} btn-${size} ${fullWidth ? 'btn-full' : ''} ${className}`}
    >
      {loading && <Loader2 className="btn-spinner" size={18} />}
      {!loading && icon && <span className="btn-icon">{icon}</span>}
      <span className="btn-text">{children}</span>
    </button>
  );
};
