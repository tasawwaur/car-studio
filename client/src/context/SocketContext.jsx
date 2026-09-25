import React, { createContext, useEffect, useState, useContext } from 'react';
import { io } from 'socket.io-client';
import { AuthContext } from './AuthContext';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState(new Set());

  useEffect(() => {
    if (isAuthenticated && user) {
      const newSocket = io('http://localhost:4000');
      
      newSocket.on('connect', () => {
        newSocket.emit('auth', user._id);
        newSocket.emit('join_community');
      });

      newSocket.on('online_users_list', (users) => setOnlineUsers(users));
      
      newSocket.on('user_typing', (data) => {
        setTypingUsers(prev => {
          const next = new Set(prev);
          next.add(data.userId);
          return next;
        });
      });

      newSocket.on('user_stop_typing', (data) => {
        setTypingUsers(prev => {
          const next = new Set(prev);
          next.delete(data.userId);
          return next;
        });
      });

      setSocket(newSocket);

      return () => newSocket.close();
    }
  }, [isAuthenticated, user]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers, typingUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
