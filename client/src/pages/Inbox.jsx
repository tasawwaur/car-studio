import React from 'react';
import Header from '../components/layout/Header';
import BottomNav from '../components/layout/BottomNav';
import './Inbox.css';
import { useNavigate } from 'react-router-dom';

const Inbox = () => {
  const navigate = useNavigate();

  const chats = [
    { id: 1, name: 'Car Community', msg: 'Nice message', time: '2m', unread: 12, isGroup: true },
    { id: 2, name: 'Rahul Sharma', msg: 'Kal mil rahe ho?', time: '10m', unread: 2 },
    { id: 3, name: 'Aman', msg: 'Nice car bro 🔥', time: '25m' },
    { id: 4, name: 'Vikram Singh', msg: 'Location share kiya?', time: '1h' },
    { id: 5, name: 'Priya', msg: 'Replied to your story', time: '2h' },
    { id: 6, name: 'Arjun', msg: 'Bro meetup kab?', time: '5h' },
  ];

  return (
    <div className="inbox-page pb-nav">
      <Header 
        leftContent={<h1 className="header-title">Inbox</h1>}
        showSearch={true}
        rightContent={<span className="edit-icon">✏️</span>}
      />
      
      <main className="inbox-content pt-header">
        <div className="inbox-tabs">
          <div className="tab active-tab">Chats</div>
          <div className="tab">Requests</div>
          <div className="tab">Community</div>
        </div>

        <div className="chat-list">
          {chats.map(chat => (
            <div 
              className="chat-row" 
              key={chat.id} 
              onClick={() => chat.isGroup ? navigate('/community') : null}
            >
              <div className={`chat-avatar ${chat.isGroup ? 'group-avatar' : ''}`}>
                {chat.isGroup ? '🚗' : <img src={`https://ui-avatars.com/api/?name=${chat.name}&background=101827&color=fff`} alt={chat.name} />}
              </div>
              <div className="chat-info">
                <div className="chat-top">
                  <span className="chat-name">{chat.name}</span>
                  <span className="chat-time">{chat.time}</span>
                </div>
                <div className="chat-bottom">
                  <span className={`chat-msg ${chat.unread ? 'unread-msg' : ''}`}>
                    {chat.msg}
                  </span>
                  {chat.unread && <span className="unread-badge">{chat.unread}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <BottomNav activeTab="inbox" />
    </div>
  );
};


export { Inbox };
