import React, { useState } from 'react';
import { Header } from '../components/layout/Header';
import { UserCard } from '../components/cards/UserCard';
import './Followers.css';

export const Followers = () => {
  const [tab, setTab] = useState('Followers');
  const mockUsers = [
    { _id: '1', name: 'Rahul Sharma', username: 'rahul', verified: true, isFollowing: true },
    { _id: '2', name: 'Amit Kumar', username: 'amit', verified: false, isFollowing: false },
  ];

  return (
    <div className="followers-page">
      <Header title={tab} showBack />
      <div className="f-tabs">
        <div className={`f-tab ${tab === 'Followers' ? 'active' : ''}`} onClick={() => setTab('Followers')}>Followers</div>
        <div className={`f-tab ${tab === 'Following' ? 'active' : ''}`} onClick={() => setTab('Following')}>Following</div>
      </div>
      <div className="f-list">
        {mockUsers.map(u => <UserCard key={u._id} user={u} />)}
      </div>
    </div>
  );
};
