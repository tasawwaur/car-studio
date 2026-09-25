import React from 'react';
import './Skeleton.css';

export const Skeleton = ({ variant = 'text', width, height, className = '' }) => {
  const style = { width, height };
  return (
    <div className={`skeleton skeleton-${variant} ${className}`} style={style} />
  );
};
