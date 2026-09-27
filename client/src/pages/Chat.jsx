import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPlayerByNameOrId } from '../data/realPlayersData';
import BottomNav from '../components/layout/BottomNav';
import './Chat.css';

const INITIAL_MESSAGES = [
  {
    id: 'm1',
    text: 'Hey! Is your car ready for the weekend rally?',
    time: '2:14 PM',
    isMe: false,
    vehicle: 'MH 02 CZ 7777'
  },
  {
    id: 'm2',
    text: 'Yes! Serviced and ready. Meeting point is 6 AM at highway toll plaza!',
    time: '2:15 PM',
    isMe: true,
    vehicle: 'UP 11 AB 1234'
  },
  {
    id: 'm3',
    text: 'Awesome! I am bringing the supercar team along 🏎️🔥',
    time: '2:16 PM',
    isMe: false,
    vehicle: 'MH 02 CZ 7777'
  }
];

const Chat = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const chatId = userId || 'c1';

  const chatPlayer = getPlayerByNameOrId(userId) || {
    id: userId || 'c1',
    name: 'Ananya Roy',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    vehicleNumber: 'MH 02 CZ 7777',
    isVerified: true
  };

  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem(`cc_chat_${chatId}`);
      return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
    } catch {
      return INITIAL_MESSAGES;
    }
  });
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [callState, setCallState] = useState(null); // null | 'calling' | 'connected' (audio or video)
  const [callType, setCallType] = useState('video'); // 'audio' | 'video'
  const [isMuted, setIsMuted] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const text = inputText.trim();
    if (!text) return;

    const newMsg = {
      id: Date.now().toString(),
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
      vehicle: 'UP 11 AB 1234'
    };

    setMessages(prev => {
      const updated = [...prev, newMsg];
      try {
        localStorage.setItem(`cc_chat_${chatId}`, JSON.stringify(updated));

        // Update Inbox last message preview
        const savedConvs = localStorage.getItem('cc_conversations');
        if (savedConvs) {
          const conversations = JSON.parse(savedConvs);
          const updatedConvs = conversations.map(c => 
            c.id === chatId ? { ...c, lastMessage: text } : c
          );
          localStorage.setItem('cc_conversations', JSON.stringify(updatedConvs));
        }
      } catch (err) {}
      return updated;
    });
    setInputText('');

    // Simulate real-time typing response from driver
    setTimeout(() => {
      setIsTyping(true);
    }, 1000);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => {
        const replyMsg = {
          id: (Date.now() + 1).toString(),
          text: 'Sounds great! See you on the track 🚗💨',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isMe: false,
          vehicle: 'MH 02 CZ 7777'
        };
        const updated = [...prev, replyMsg];
        try {
          localStorage.setItem(`cc_chat_${chatId}`, JSON.stringify(updated));
        } catch (err) {}
        return updated;
      });
    }, 3200);
  };

  const startCall = (type) => {
    setCallType(type);
    setCallState('calling');
    setTimeout(() => {
      setCallState('connected');
    }, 2500);
  };

  const endCall = () => {
    setCallState(null);
    setIsMuted(false);
  };

  return (
    <div className="dc-page">

      {/* ── Sticky Header ── */}
      <header className="dc-header">
        <button className="dc-hdr-round-btn" onClick={() => navigate(-1)} aria-label="Back">
          ←
        </button>

        <div 
          className="dc-user-header-info"
          onClick={() => navigate(`/profile/${chatPlayer.id || chatId}`)}
          style={{ cursor: 'pointer' }}
          title={`View ${chatPlayer.name}'s Profile`}
        >
          <div className="dc-hdr-avatar-ring">
            <img src={chatPlayer.avatar} alt={chatPlayer.name} className="dc-hdr-avatar" />
            <span className="dc-hdr-online-dot" />
          </div>

          <div className="dc-hdr-text">
            <div className="dc-hdr-name-row">
              <span className="dc-hdr-name">{chatPlayer.name}</span>
              {chatPlayer.isVerified !== false && <span className="dc-hdr-verified">✓</span>}
            </div>
            <span className="dc-hdr-vehicle">🚗 {chatPlayer.vehicleNumber || 'MH 02 CZ 7777'}</span>
          </div>
        </div>

        {/* Audio & Video Call Header Buttons */}
        <div className="dc-hdr-call-btns">
          <button className="dc-call-icon-btn" onClick={() => startCall('audio')} title="Audio Call">
            📞
          </button>
          <button className="dc-call-icon-btn" onClick={() => startCall('video')} title="Video Call">
            📹
          </button>
        </div>
      </header>

      {/* ── Messages Body ── */}
      <div className="dc-body">
        {messages.map((m) => (
          <div key={m.id} className={`dc-msg-row ${m.isMe ? 'mine' : 'other'}`}>
            <div className={`dc-msg-bubble ${m.isMe ? 'my-bubble' : 'other-bubble'}`}>
              {m.text}
            </div>
            <span className="dc-msg-time">{m.time}</span>
          </div>
        ))}

        {/* Dynamic Typing Indicator */}
        {isTyping && (
          <div className="dc-typing-row">
            <div className="dc-typing-bubble">
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </div>
            <span className="typing-label">Ananya is typing...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ── Input Bar ── */}
      <form className="dc-input-bar" onSubmit={handleSend}>
        <span className="dc-input-icon">📷</span>
        <input 
          type="text" 
          className="dc-input-field" 
          placeholder="Message Ananya..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button type="submit" className="dc-send-btn">
          🚀
        </button>
      </form>

      {/* ── Real-Time WebRTC Call Overlay Modal ── */}
      {callState && (
        <div className="dc-call-overlay">
          <div className="dc-call-modal">
            {callType === 'video' && (
              <div className="dc-video-bg">
                <img src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800" alt="Video Feed" className="dc-video-img" />
              </div>
            )}

            <div className="dc-call-info">
              <div className="dc-call-avatar-ring">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200" alt="Ananya" className="dc-call-avatar" />
              </div>
              <h3 className="dc-call-name">Ananya Roy</h3>
              <p className="dc-call-status">
                {callState === 'calling' ? `Calling Ananya (${callType.toUpperCase()})...` : '00:14 · Connected HD Audio/Video'}
              </p>
            </div>

            {/* Call Action Controls */}
            <div className="dc-call-controls">
              <button 
                className={`dc-ctrl-btn ${isMuted ? 'muted' : ''}`}
                onClick={() => setIsMuted(m => !m)}
                title="Mute/Unmute"
              >
                {isMuted ? '🔇' : '🎙️'}
              </button>

              <button className="dc-ctrl-btn end-call" onClick={endCall} title="End Call">
                📞
              </button>

              <button className="dc-ctrl-btn" title="Speaker">
                🔊
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Chat;
export { Chat };
