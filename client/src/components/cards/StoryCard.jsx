import React from 'react';
import { Plus } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import './StoryCard.css';

export const StoryCard = ({ user, isSelf, viewed }) => {
  return (
    <div className="story-card">
      <div className={`story-ring ${viewed ? 'viewed' : ''} ${isSelf ? 'self' : ''}`}>
        <Avatar src={user?.avatar} name={user?.name} size="lg" />
        {isSelf && (
          <div className="story-add-btn">
            <Plus size={14} strokeWidth={3} />
          </div>
        )}
      </div>
      <span className="story-name">{isSelf ? 'Your Story' : user?.username}</span>
    </div>
  );
};
