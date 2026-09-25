import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/layout/Header';
import { Input } from '../../components/ui/Input';
import { GradientButton } from '../../components/ui/GradientButton';
import { Camera } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import './Onboarding.css';

export const ProfileSetup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ username: '', bio: '', location: '' });

  const handleComplete = () => {
    // Mock login
    login({ _id: '1', username: formData.username || 'user', name: 'Verified User', verified: true }, 'mock_token');
    navigate('/home');
  };

  return (
    <div className="onboarding-page anim-fade-in">
      <Header title="Create Your Profile" />
      <div className="ob-content" style={{ paddingBottom: '100px', overflowY: 'auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px', marginTop: '16px' }}>
          <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'var(--surface2)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', border: '2px dashed var(--border)' }}>
            <Camera size={32} color="var(--text-muted)" />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Input 
            label="Username" 
            placeholder="@username" 
            value={formData.username}
            onChange={e => setFormData({...formData, username: e.target.value})}
          />
          <Input 
            label="Bio" 
            placeholder="Tell us about yourself & your car" 
            value={formData.bio}
            onChange={e => setFormData({...formData, bio: e.target.value})}
          />
          <Input 
            label="Location" 
            placeholder="City, State" 
            value={formData.location}
            onChange={e => setFormData({...formData, location: e.target.value})}
          />
        </div>
      </div>
      <div className="ob-footer" style={{ position: 'fixed', bottom: 0, width: '100%', maxWidth: '430px' }}>
        <GradientButton onClick={handleComplete} disabled={!formData.username}>
          Complete Setup
        </GradientButton>
      </div>
    </div>
  );
};
