import React, { useState } from 'react';
import { Avatar } from '../ui/Avatar';
import { VehicleBadge } from '../ui/VehicleBadge';
import { Button } from '../ui/Button';
import { social } from '../../services/api';
import './UserCard.css';

export const UserCard = ({ user }) => {
  const [following, setFollowing] = useState(user.isFollowing);
  
  const handleFollow = async () => {
    setFollowing(!following);
    try {
      if (following) await social.unfollowUser(user._id);
      else await social.followUser(user._id);
    } catch {
      setFollowing(following);
    }
  };

  return (
    <div className="user-card">
      <div className="uc-info">
        <Avatar src={user.avatar} name={user.name} verified={user.verified} />
        <div className="uc-meta">
          <div className="uc-name">{user.name}</div>
          <div className="uc-username">@{user.username}</div>
          {user.vehicle && <VehicleBadge regNumber={user.vehicle.regNumber} />}
        </div>
      </div>
      <Button 
        variant={following ? 'outline' : 'primary'} 
        size="sm" 
        onClick={handleFollow}
      >
        {following ? 'Following' : 'Follow'}
      </Button>
    </div>
  );
};
