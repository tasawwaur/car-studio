import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Header } from '../../components/layout/Header';
import { Input } from '../../components/ui/Input';
import { GradientButton } from '../../components/ui/GradientButton';
import { useAuth } from '../../hooks/useAuth';
import './Login.css';

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock login
    login({ _id: '1', name: formData.name || 'Test User', username: 'tester', verified: true }, 'mock_token');
    navigate('/home');
  };

  return (
    <div className="login-page anim-fade-in">
      <Header showBack />
      <div className="login-content">
        <h1 className="login-title">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
        <p className="login-subtitle">Connect with car enthusiasts</p>

        <form onSubmit={handleSubmit} className="login-form">
          {!isLogin && (
            <Input 
              placeholder="Full Name" 
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          )}
          <Input 
            type="email"
            placeholder="Email address" 
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
          />
          <Input 
            type="password"
            placeholder="Password" 
            value={formData.password}
            onChange={e => setFormData({...formData, password: e.target.value})}
          />
          
          {isLogin && <div className="forgot-pass">Forgot Password?</div>}
          
          <GradientButton className="mt-4" type="submit">
            {isLogin ? 'Login' : 'Sign Up'}
          </GradientButton>
        </form>

        <div className="login-toggle">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Sign Up' : 'Login'}</span>
        </div>

        <div className="verify-banner">
          <p>Own a vehicle?</p>
          <Link to="/onboarding/vehicle-number">Verify to get special badge →</Link>
        </div>
      </div>
    </div>
  );
};
