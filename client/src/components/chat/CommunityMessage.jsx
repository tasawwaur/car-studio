import React from 'react';
import { Avatar } from '../ui/Avatar';
import { VehicleBadge } from '../ui/VehicleBadge';
import './CommunityMessage.css';

export const CommunityMessage = ({ message, isOwn }) => {
  const time = new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={`community-msg ${isOwn ? 'own' : 'other'}`}>
      {!isOwn && (
        <Avatar src={message.sender?.avatar} name={message.sender?.name} size="sm" showBadge={message.sender?.online} />
      )}
      <div className="cm-content">
        {!isOwn && (
          <div className="cm-header">
            <span className="cm-name">{message.sender?.name}</span>
            {message.sender?.vehicle && (
              <VehicleBadge regNumber={message.sender.vehicle.regNumber} />
            )}
          </div>
        )}
        <div className="cm-bubble">
          {message.content}
          <span className="cm-time">{time}</span>
        </div>
      </div>
    </div>
  );
};
