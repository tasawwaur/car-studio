import React, { useState, useEffect, useRef } from 'react';
import { ReelCard } from '../cards/ReelCard';
import './ReelPlayer.css';

export const ReelPlayer = ({ reels }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const index = Math.round(containerRef.current.scrollTop / window.innerHeight);
        setActiveIndex(index);
      }
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => container?.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="reel-player" ref={containerRef}>
      {reels.map((reel, idx) => (
        <ReelCard key={reel._id} reel={reel} isActive={idx === activeIndex} />
      ))}
    </div>
  );
};
