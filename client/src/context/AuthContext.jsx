import React, { createContext, useState, useEffect } from 'react';
import { auth as authApi } from '../services/api';
import toast from 'react-hot-toast';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('cc_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      authApi.getProfile()
        .then(res => setUser(res.data))
        .catch(() => {
          localStorage.removeItem('cc_token');
          setToken(null);
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = (userData, newToken) => {
    localStorage.setItem('cc_token', newToken);
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('cc_token');
    setToken(null);
    setUser(null);
    toast.success('Logged out successfully');
  };

  const updateUser = (data) => {
    setUser({ ...user, ...data });
  };

  return (
    <AuthContext.Provider value={{
      user, token, login, logout, updateUser, isAuthenticated: !!token, loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};
