import React from 'react';
import './VerifiedBadge.css';
import { Check } from 'lucide-react';

export const VerifiedBadge = ({ size = 'md', className = '' }) => (
  <div className={`verified-badge badge-${size} ${className}`} title="Verified Vehicle Owner">
    <Check size={size === 'sm' ? 10 : size === 'md' ? 12 : 16} strokeWidth={3} />
  </div>
);
