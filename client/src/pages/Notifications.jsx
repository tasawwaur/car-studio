import React from 'react';
import { Header } from '../components/layout/Header';
import { Avatar } from '../components/ui/Avatar';
import './Notifications.css';

export const Notifications = () => {
  const notifs = [
    { id: 1, text: 'liked your post', user: { name: 'Amit' }, time: '2m', type: 'like' },
    { id: 2, text: 'started following you', user: { name: 'Rahul' }, time: '1h', type: 'follow' },
  ];

  return (
    <div className="notifications-page">
      <Header title="Notifications" showBack />
      <div className="n-list">
        {notifs.map(n => (
          <div key={n.id} className="n-item">
            <Avatar size="sm" name={n.user.name} />
            <div className="n-content">
              <strong>{n.user.name}</strong> {n.text}
              <div className="n-time">{n.time}</div>
            </div>
            {n.type === 'like' && <div className="n-preview" />}
          </div>
        ))}
      </div>
    </div>
  );
};
