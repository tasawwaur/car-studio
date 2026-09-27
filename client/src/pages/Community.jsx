import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { AuthContext } from '../context/AuthContext';
import BottomNav from '../components/layout/BottomNav';
import './Community.css';

const INITIAL_PUBLIC_MESSAGES = [
  {
    id: 'm1',
    sender: 'Rahul Sharma',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    text: 'Hey everyone! Mussoorie highway drive for all members this Sunday morning 🚗💨',
    time: '2:30 PM',
    isMe: false,
    vehicle: 'DL 5S AB 9999'
  },
  {
    id: 'm2',
    sender: 'Neha Verma',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100',
    text: 'Count me in! What time is everyone meeting at the toll plaza?',
    time: '2:32 PM',
    isMe: false,
    vehicle: 'DL 8C AB 1234'
  },
  {
    id: 'm3',
    sender: 'Vikram Singh',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100',
    text: '6:30 AM sharp at food plaza. All car models welcome 🔥',
    time: '2:35 PM',
    isMe: false,
    vehicle: 'HR 26 XX 8888'
  }
];

const Community = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('cc_community_messages');
      return saved ? JSON.parse(saved) : INITIAL_PUBLIC_MESSAGES;
    } catch {
      return INITIAL_PUBLIC_MESSAGES;
    }
  });
  const [inputText, setInputText] = useState('');
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  const currentUserId = user?._id || 'my_user_id';
  const currentUserName = user?.name || 'Mohammad Tasawwar';
  const currentVehicle = user?.vehicleNumber || 'UP 11 AB 1234';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    let socket;
    try {
      // Connect Real Socket.IO client to backend server
      socket = io('http://localhost:4000', {
        transports: ['websocket', 'polling'],
        auth: { token: 'demo-token', userId: currentUserId }
      });
      socketRef.current = socket;

      socket.emit('join_community');

      // Real-Time Listen for Broadcast Messages from ALL connected users
      socket.on('receive_message', (data) => {
        setMessages(prev => {
          // Prevent duplicate messages if already present
          if (prev.some(m => m.id === data.id)) return prev;
          
          const isMine = data.senderId === currentUserId || data.sender === currentUserName;
          const newMsg = {
            id: data.id || Date.now().toString(),
            sender: data.sender || 'Driver',
            avatar: data.avatar || (isMine ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100' : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'),
            text: data.text,
            time: data.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isMe: isMine,
            vehicle: data.vehicle || 'UP 11 AB 1234'
          };

          const updated = [...prev, newMsg];
          try {
            localStorage.setItem('cc_community_messages', JSON.stringify(updated));
          } catch (err) {}
          return updated;
        });
      });
    } catch (err) {
      console.log('Socket connection error:', err);
    }

    return () => {
      socket?.disconnect();
    };
  }, [currentUserId, currentUserName]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const text = inputText.trim();
    if (!text) return;

    const newMsgId = Date.now().toString();
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newMsgData = {
      id: newMsgId,
      roomType: 'community',
      sender: currentUserName,
      senderId: currentUserId,
      avatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
      text: text,
      time: currentTime,
      vehicle: currentVehicle,
      isMe: true
    };

    // 1. Immediately append to local messages list so it shows instantly
    setMessages(prev => {
      const updated = [...prev, newMsgData];
      try {
        localStorage.setItem('cc_community_messages', JSON.stringify(updated));
        
        // Also update last message in cc_conversations for Inbox
        const savedConvs = localStorage.getItem('cc_conversations');
        if (savedConvs) {
          const conversations = JSON.parse(savedConvs);
          const updatedConvs = conversations.map(c => 
            c.id === 'community' ? { ...c, lastMessage: `${currentUserName.split(' ')[0]}: ${text}` } : c
          );
          localStorage.setItem('cc_conversations', JSON.stringify(updatedConvs));
        }
      } catch (err) {}
      return updated;
    });
    setInputText('');

    // 2. Broadcast via Socket.IO to all other connected users/tabs
    try {
      if (socketRef.current && socketRef.current.connected) {
        socketRef.current.emit('send_message', newMsgData);
      }
    } catch (err) {
      console.log('Socket emit failed:', err);
    }
  };

  return (
    <div className="pub-chat-page">

      {/* ── Top Header ── */}
      <header className="pub-chat-header">
        <button className="pub-hdr-round-btn" onClick={() => navigate(-1)} aria-label="Back">
          ←
        </button>

        <div className="pub-chat-header-title">
          <h2 className="pub-chat-name">CarConnect Public Club 🏆</h2>
          <span className="pub-chat-status">1.2k Drivers Online 🟢</span>
        </div>

        <button className="pub-hdr-round-btn" aria-label="Options">
          ⋮
        </button>
      </header>

      {/* ── Messages Scroll Area ── */}
      <div className="pub-chat-body">
        {messages.map((msg) => (
          <div key={msg.id} className={`pub-msg-row ${msg.isMe ? 'mine' : 'other'}`}>
            {!msg.isMe && (
              <img src={msg.avatar} alt={msg.sender} className="pub-msg-avatar" />
            )}

            <div className="pub-msg-bubble-wrap">
              {!msg.isMe && (
                <div className="pub-msg-sender-line">
                  <span className="pub-sender-name">{msg.sender}</span>
                  <span className="pub-sender-vehicle">🚗 {msg.vehicle}</span>
                </div>
              )}

              <div className={`pub-msg-bubble ${msg.isMe ? 'my-bubble' : 'other-bubble'}`}>
                {msg.text}
              </div>

              <span className="pub-msg-time">{msg.time}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* ── Input Box Bar ── */}
      <form className="pub-chat-input-bar" onSubmit={handleSendMessage}>
        <span className="pub-input-icon">📷</span>
        <input 
          type="text"
          className="pub-chat-input"
          placeholder="Message to all drivers in Public Club..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button type="submit" className="pub-send-btn" aria-label="Send Message">
          🚀
        </button>
      </form>

      {/* ── Bottom Nav ── */}
      <BottomNav />
    </div>
  );
};

export { Community };
export default Community;
