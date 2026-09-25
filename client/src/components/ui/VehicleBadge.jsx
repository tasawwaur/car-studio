import React from 'react';
import './VehicleBadge.css';
import { Car } from 'lucide-react';

export const VehicleBadge = ({ regNumber, className = '' }) => (
  <div className={`vehicle-badge ${className}`}>
    <Car size={14} className="vehicle-icon" />
    <span className="vehicle-reg">{regNumber}</span>
  </div>
);
