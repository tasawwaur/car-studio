import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { ChatBubble } from '../components/chat/ChatBubble';
import { ChatInput } from '../components/chat/ChatInput';
import { useChat } from '../hooks/useChat';
import { Avatar } from '../components/ui/Avatar';
import './Chat.css';

export const Chat = () => {
  const { userId } = useParams();
  const { messages, sendMessage } = useChat(userId, false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-page">
      <div className="chat-header-fixed">
        <Header showBack title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Avatar size="sm" name="User" />
            <span>User {userId}</span>
          </div>
        } />
      </div>
      
      <div className="chat-messages">
        {messages.map(m => (
          <ChatBubble key={m._id} message={m} isOwn={m.senderId !== userId} />
        ))}
        <div ref={bottomRef} />
      </div>

      <ChatInput onSend={(text) => sendMessage(text)} />
    </div>
  );
};
