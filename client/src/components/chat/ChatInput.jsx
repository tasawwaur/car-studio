import React, { useState, useRef } from 'react';
import { Paperclip, Send, Mic, Smile } from 'lucide-react';
import './ChatInput.css';

export const ChatInput = ({ onSend }) => {
  const [text, setText] = useState('');
  const inputRef = useRef(null);
  const fileRef = useRef(null);

  const handleSend = () => {
    if (text.trim()) {
      onSend(text.trim());
      setText('');
    }
  };

  return (
    <div className="chat-input-container">
      <button className="ci-icon-btn" onClick={() => fileRef.current?.click()}>
        <Paperclip size={22} />
      </button>
      <input type="file" ref={fileRef} style={{ display: 'none' }} />
      
      <div className="ci-input-wrapper">
        <button className="ci-icon-btn sm"><Smile size={20} /></button>
        <input
          ref={inputRef}
          type="text"
          className="ci-input"
          placeholder="Message..."
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
        />
      </div>

      {text.trim() ? (
        <button className="ci-send-btn" onClick={handleSend}>
          <Send size={20} />
        </button>
      ) : (
        <button className="ci-icon-btn">
          <Mic size={22} />
        </button>
      )}
    </div>
  );
};
