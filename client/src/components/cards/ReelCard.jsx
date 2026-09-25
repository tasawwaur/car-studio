import React, { useRef, useState, useEffect } from 'react';
import { Heart, MessageCircle, Send, Bookmark, Music } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { VehicleBadge } from '../ui/VehicleBadge';
import './ReelCard.css';

export const ReelCard = ({ reel, isActive }) => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [liked, setLiked] = useState(reel.isLiked);

  useEffect(() => {
    if (isActive) {
      videoRef.current?.play().catch(e => console.log(e));
      setPlaying(true);
    } else {
      videoRef.current?.pause();
      setPlaying(false);
    }
  }, [isActive]);

  const togglePlay = () => {
    if (playing) {
      videoRef.current?.pause();
      setPlaying(false);
    } else {
      videoRef.current?.play();
      setPlaying(true);
    }
  };

  return (
    <div className="reel-card">
      <video
        ref={videoRef}
        src={reel.videoUrl}
        className="reel-video"
        loop
        playsInline
        onClick={togglePlay}
      />
      {!playing && <div className="play-overlay" onClick={togglePlay}>▶</div>}
      
      <div className="reel-sidebar">
        <div className="reel-action">
          <Avatar src={reel.user?.avatar} size="md" className="reel-avatar" />
          <button className="follow-btn">+</button>
        </div>
        <div className="reel-action" onClick={() => setLiked(!liked)}>
          <Heart size={28} fill={liked ? 'var(--danger)' : 'none'} color={liked ? 'var(--danger)' : 'white'} />
          <span>{reel.likesCount || 0}</span>
        </div>
        <div className="reel-action">
          <MessageCircle size={28} />
          <span>{reel.commentsCount || 0}</span>
        </div>
        <div className="reel-action">
          <Send size={28} />
        </div>
        <div className="reel-action">
          <MoreHorizontal size={28} />
        </div>
      </div>

      <div className="reel-bottom">
        <div className="reel-user-row">
          <span className="reel-username">@{reel.user?.username}</span>
          {reel.vehicle && <VehicleBadge regNumber={reel.vehicle.regNumber} />}
        </div>
        <p className="reel-caption">{reel.caption}</p>
        <div className="reel-audio">
          <Music size={14} className="marquee-icon" />
          <div className="marquee">
            <span>{reel.audioName || 'Original Audio - @' + reel.user?.username}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
import { MoreHorizontal } from 'lucide-react';
