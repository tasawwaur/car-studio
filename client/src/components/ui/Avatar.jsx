import React from 'react';
import './Avatar.css';
import { VerifiedBadge } from './VerifiedBadge';

export const Avatar = ({ src, name = 'U', size = 'md', showBadge = false, verified = false, className = '' }) => {
  const getInitials = (n) => n.charAt(0).toUpperCase();

  return (
    <div className={`cc-avatar avatar-${size} ${className}`}>
      {src ? (
        <img src={src} alt={name} className="avatar-img" />
      ) : (
        <div className="avatar-fallback">{getInitials(name)}</div>
      )}
      {showBadge && <div className="avatar-online-badge"></div>}
      {verified && <div className="avatar-verified-wrapper"><VerifiedBadge size="sm" /></div>}
    </div>
  );
};
