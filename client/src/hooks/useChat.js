import { useState, useEffect, useCallback } from 'react';
import { chat } from '../services/api';
import { useSocket } from './useSocket';
import { useAuth } from './useAuth';
import toast from 'react-hot-toast';

export const useChat = (receiverId = null, isCommunity = false) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { socket } = useSocket();
  const { user } = useAuth();

  const loadHistory = useCallback(async () => {
    try {
      setLoading(true);
      const res = isCommunity 
        ? await chat.getCommunityHistory()
        : await chat.getPrivateHistory(receiverId);
      setMessages(res.data || []);
    } catch (err) {
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  }, [receiverId, isCommunity]);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  useEffect(() => {
    if (socket) {
      const handleNewMessage = (msg) => {
        const isCurrentChat = isCommunity 
          ? msg.isCommunity 
          : (msg.senderId === receiverId || msg.receiverId === receiverId);
          
        if (isCurrentChat) {
          setMessages(prev => [...prev, msg]);
        }
      };
      
      socket.on('new_message', handleNewMessage);
      return () => socket.off('new_message', handleNewMessage);
    }
  }, [socket, receiverId, isCommunity]);

  const sendMessage = async (content, messageType = 'text', fileUrl = null) => {
    if (!content && !fileUrl) return;
    const msgData = {
      content,
      receiverId: isCommunity ? null : receiverId,
      isCommunity,
      messageType,
      fileUrl
    };
    
    // Optimistic update
    const tempMsg = {
      _id: Date.now().toString(),
      sender: user,
      senderId: user._id,
      ...msgData,
      createdAt: new Date().toISOString()
    };
    setMessages(prev => [...prev, tempMsg]);
    
    try {
      if (socket) {
        socket.emit('send_message', msgData);
      } else {
        await chat.sendMessage(msgData);
      }
    } catch (err) {
      toast.error('Failed to send message');
      setMessages(prev => prev.filter(m => m._id !== tempMsg._id));
    }
  };

  return { messages, loading, sendMessage, loadHistory };
};
