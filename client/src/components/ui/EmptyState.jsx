import React from 'react';
import './EmptyState.css';

export const EmptyState = ({ icon, title, subtitle, action }) => (
  <div className="empty-state">
    <div className="empty-icon">{icon}</div>
    <h3 className="empty-title">{title}</h3>
    {subtitle && <p className="empty-subtitle">{subtitle}</p>}
    {action && <div className="empty-action">{action}</div>}
  </div>
);
