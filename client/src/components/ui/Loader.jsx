import React from 'react';
import './Loader.css';

export const Loader = ({ size = 'md', center = false }) => {
  const loader = <div className={`cc-loader loader-${size}`}></div>;
  if (center) {
    return <div className="loader-center">{loader}</div>;
  }
  return loader;
};
