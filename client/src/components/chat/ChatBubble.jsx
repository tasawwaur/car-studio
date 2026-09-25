import React from 'react';
import { Check, CheckCheck } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import './ChatBubble.css';

export const ChatBubble = ({ message, isOwn, showAvatar }) => {
  const time = new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={`chat-bubble-wrapper ${isOwn ? 'own' : 'other'}`}>
      {!isOwn && showAvatar && (
        <Avatar src={message.sender?.avatar} name={message.sender?.name} size="sm" className="cb-avatar" />
      )}
      {!isOwn && !showAvatar && <div className="cb-avatar-placeholder" />}
      
      <div className="chat-bubble">
        {message.messageType === 'image' && (
          <img src={message.fileUrl} alt="attachment" className="cb-image" />
        )}
        {message.messageType === 'audio' && (
          <audio src={message.fileUrl} controls className="cb-audio" />
        )}
        {message.content && <p className="cb-text">{message.content}</p>}
        
        <div className="cb-meta">
          <span className="cb-time">{time}</span>
          {isOwn && (
            <span className="cb-status">
              {message.read ? <CheckCheck size={14} color="var(--primary-end)" /> : <Check size={14} />}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
