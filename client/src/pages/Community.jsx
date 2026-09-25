import React from 'react';
import Header from '../components/layout/Header';
import BottomNav from '../components/layout/BottomNav';
import './Community.css';

const Community = () => {
  return (
    <div className="community-page pb-nav">
      <Header 
        showBack={true}
        leftContent={
          <div className="chat-header-info">
            <span className="chat-title">Car Community</span>
            <span className="chat-subtitle">1.2k members</span>
          </div>
        }
        showSearch={true}
        rightContent={<span className="dots-icon">⋮</span>}
      />
      
      <main className="chat-area pt-header">
        <div className="message received">
          <img src="https://ui-avatars.com/api/?name=RS&background=101827&color=fff" alt="Rahul" className="msg-avatar" />
          <div className="msg-content">
            <span className="sender-name">Rahul</span>
            <div className="msg-bubble">Nice car 🔥</div>
            <span className="msg-time">2:31 PM</span>
          </div>
        </div>

        <div className="message received">
          <img src="https://ui-avatars.com/api/?name=A&background=101827&color=fff" alt="Aman" className="msg-avatar" />
          <div className="msg-content">
            <span className="sender-name">Aman</span>
            <div className="msg-bubble">Saharanpur se hai kya?</div>
            <span className="msg-time">2:31 PM</span>
          </div>
        </div>

        <div className="message sent">
          <div className="msg-content align-right">
            <div className="msg-bubble my-bubble">Haan bhai main Saharanpur se hu</div>
            <span className="msg-time">2:33 PM</span>
          </div>
        </div>

        <div className="message received">
          <img src="https://ui-avatars.com/api/?name=N&background=101827&color=fff" alt="Neha" className="msg-avatar" />
          <div className="msg-content">
            <span className="sender-name">Neha</span>
            <div className="msg-bubble with-reaction">
              Weekend drive plan karein? 🚗
              <span className="reaction">❤️ 5</span>
            </div>
            <span className="msg-time">2:34 PM</span>
          </div>
        </div>

        <div className="message received">
          <img src="https://ui-avatars.com/api/?name=V&background=101827&color=fff" alt="Vikram" className="msg-avatar" />
          <div className="msg-content">
            <span className="sender-name">Vikram</span>
            <div className="msg-bubble with-reaction">
              Sunday ko chalte hain 👍
              <span className="reaction">👍 2</span>
            </div>
            <span className="msg-time">2:35 PM</span>
          </div>
        </div>
      </main>

      <div className="chat-input-area">
        <span className="icon">📎</span>
        <input type="text" placeholder="Type a message..." className="chat-input" />
        <span className="icon">😊</span>
        <span className="icon">🎤</span>
      </div>

      <BottomNav activeTab="inbox" />
    </div>
  );
};


export { Community };
