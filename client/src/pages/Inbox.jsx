import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import BottomNav from '../components/layout/BottomNav';
import './Inbox.css';

/* ── Sample Luxury Conversations List with Public Group Chat at Top ── */
const SAMPLE_CONVERSATIONS = [
  {
    id: 'community',
    isPublicGroup: true,
    user: {
      name: 'CarConnect Public Club 🏆',
      avatar: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=200',
      isOnline: true,
      vehicleNumber: 'PUBLIC LOUNGE · 1.2k Drivers'
    },
    lastMessage: 'Rahul: Sunday mussoorie highway drive for all members! 🚗💨',
    time: 'Live 🟢',
    unreadCount: 9,
    carWatermark: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=300'
  },
  {
    id: 'c1',
    user: {
      name: 'Ananya Roy',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
      isOnline: true,
      vehicleNumber: 'MH 02 CZ 7777'
    },
    lastMessage: 'Hey! Are you coming to the Mussoorie drive this weekend?',
    time: '2m',
    unreadCount: 3,
    carWatermark: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=300'
  },
  {
    id: 'c2',
    user: {
      name: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200',
      isOnline: false,
      vehicleNumber: 'DL 8C AB 1234'
    },
    lastMessage: 'Checked out your new hypercar photos! Looks insane 🔥',
    time: '15m',
    unreadCount: 1,
    carWatermark: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=300'
  },
  {
    id: 'c3',
    user: {
      name: 'Rahul Verma',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
      isOnline: true,
      vehicleNumber: 'UP 11 AB 9999'
    },
    lastMessage: 'Offroading track booked for Sunday morning!',
    time: '1h',
    unreadCount: 0,
    carWatermark: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=300'
  },
  {
    id: 'c4',
    user: {
      name: 'Vikram Supercars',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200',
      isOnline: true,
      vehicleNumber: 'HR 26 XX 8888'
    },
    lastMessage: 'Let us meet up at the highway food plaza around 7 PM.',
    time: '3h',
    unreadCount: 5,
    carWatermark: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=300'
  }
];

const Inbox = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [activeSubTab, setActiveSubTab] = useState('direct');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [conversations, setConversations] = useState(() => {
    try {
      const saved = localStorage.getItem('cc_conversations');
      return saved ? JSON.parse(saved) : SAMPLE_CONVERSATIONS;
    } catch {
      return SAMPLE_CONVERSATIONS;
    }
  });

  // Compute live total unread count across all conversations
  const totalUnreadCount = conversations.reduce((sum, c) => sum + (c.unreadCount || 0), 0);

  const filteredConversations = conversations.filter(c => 
    c.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.user.vehicleNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCardClick = (chat) => {
    // Clear unread count for clicked chat
    const updated = conversations.map(c => 
      c.id === chat.id ? { ...c, unreadCount: 0 } : c
    );
    setConversations(updated);
    try {
      localStorage.setItem('cc_conversations', JSON.stringify(updated));
    } catch {}

    if (chat.isPublicGroup || chat.id === 'community') {
      navigate('/inbox/community');
    } else {
      navigate(`/inbox/${chat.id}`);
    }
  };

  return (
    <div className="ib-page">

      {/* ── Sticky Luxury Header ── */}
      <header className="ib-header">
        <button className="ib-hdr-round-btn" onClick={() => navigate(-1)} aria-label="Go Back">
          ←
        </button>

        {/* Center Title Chat Icon */}
        <div className="ib-hdr-center-badge">
          <span className="ib-hdr-chat-icon">💬</span>
        </div>

        <button className="ib-hdr-round-btn" aria-label="Options">
          ⋮
        </button>
      </header>

      {/* ── Main Scroll Container ── */}
      <div className="ib-content">

        {/* Search Input Bar */}
        <div className="ib-search-bar">
          <span className="ib-search-icon">🔍</span>
          <input 
            type="text"
            className="ib-search-input"
            placeholder="Search conversations or vehicle number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* 4 Sub-Navigation Category Buttons */}
        <div className="ib-subnav-grid">
          <button 
            className={`ib-subnav-btn ${activeSubTab === 'direct' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('direct')}
            title="Direct Messages"
          >
            <span>💬</span>
          </button>

          <button 
            className={`ib-subnav-btn ${activeSubTab === 'groups' ? 'active' : ''}`}
            onClick={() => { setActiveSubTab('groups'); navigate('/inbox/community'); }}
            title="Public Car Club"
          >
            <span>👥</span>
          </button>

          <button 
            className={`ib-subnav-btn ${activeSubTab === 'add' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('add')}
            title="Add Friend"
          >
            <span>👤+</span>
          </button>

          <button 
            className={`ib-subnav-btn ${activeSubTab === 'settings' ? 'active' : ''}`}
            onClick={() => navigate('/settings')}
            title="Chat Settings"
          >
            <span>⚙️</span>
          </button>
        </div>

        {/* Conversations List */}
        <div className="ib-chat-list">
          {filteredConversations.map((chat) => (
            <div 
              key={chat.id} 
              className={`ib-chat-card ${chat.isPublicGroup ? 'public-club-card' : ''}`}
              onClick={() => handleCardClick(chat)}
            >
              {/* Background Car Watermark Graphic */}
              <div 
                className="ib-car-watermark" 
                style={{ backgroundImage: `url(${chat.carWatermark})` }}
              />

              {/* Avatar with Online/Offline Indicator */}
              <div className={`ib-avatar-ring ${chat.isPublicGroup ? 'club-avatar-ring' : ''}`}>
                <img src={chat.user.avatar} alt={chat.user.name} className="ib-avatar-img" />
                <span className={`ib-online-dot ${chat.user.isOnline ? 'online' : 'offline'}`} />
              </div>

              {/* Chat Info */}
              <div className="ib-chat-info">
                <div className="ib-chat-name-row">
                  <span className="ib-chat-name">{chat.user.name}</span>
                  {chat.isPublicGroup && <span className="public-group-badge">PUBLIC</span>}
                </div>
                <p className="ib-chat-preview">{chat.lastMessage}</p>
              </div>

              {/* Right Side Info (Time, Unread Badge, Chevron) */}
              <div className="ib-chat-meta">
                <span className="ib-chat-time">{chat.time}</span>
                
                {chat.unreadCount > 0 ? (
                  <span className="ib-unread-badge">{chat.unreadCount}</span>
                ) : (
                  <span className="ib-read-dot"></span>
                )}
                
                <span className="ib-chevron">›</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ── Bottom Nav with Dynamic Live Unread Count ── */}
      <BottomNav unreadCount={totalUnreadCount} />
    </div>
  );
};

export default Inbox;
export { Inbox };
