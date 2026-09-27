import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { REAL_PLAYERS_DATA } from '../data/realPlayersData';
import BottomNav from '../components/layout/BottomNav';
import './Followers.css';

const Followers = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  
  const [activeTab, setActiveTab] = useState(tabParam === 'following' ? 'following' : 'followers');

  useEffect(() => {
    if (tabParam === 'following' || tabParam === 'followers') {
      setActiveTab(tabParam);
    }
  }, [tabParam]);
  const [searchQuery, setSearchQuery] = useState('');
  const [followingMap, setFollowingMap] = useState({
    p1: true, p3: true, p5: true, p7: true, p9: true
  });

  const followersList = REAL_PLAYERS_DATA.slice(0, 50);
  const followingList = REAL_PLAYERS_DATA.slice(50, 100);
  const activeList = activeTab === 'followers' ? followersList : followingList;

  const filteredList = activeList.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.vehicleNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFollow = (id, e) => {
    e.stopPropagation();
    setFollowingMap(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="fl-page">

      {/* ── Sticky Header ── */}
      <header className="fl-header">
        <button className="fl-hdr-btn" onClick={() => navigate(-1)} aria-label="Go Back">
          ←
        </button>
        <h2 className="fl-title">100 Drivers & Players</h2>
        <button className="fl-hdr-btn" aria-label="Options">
          ⋮
        </button>
      </header>

      {/* ── Main Container ── */}
      <div className="fl-content">

        {/* Search Bar */}
        <div className="fl-search-bar">
          <span className="fl-search-icon">🔍</span>
          <input 
            type="text" 
            className="fl-search-input" 
            placeholder="Search 100 real driver profiles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Followers / Following Filter Tabs */}
        <div className="fl-tabs">
          <button 
            className={`fl-tab-btn ${activeTab === 'followers' ? 'active' : ''}`}
            onClick={() => setActiveTab('followers')}
          >
            Followers (50)
            {activeTab === 'followers' && <span className="fl-active-indicator" />}
          </button>

          <button 
            className={`fl-tab-btn ${activeTab === 'following' ? 'active' : ''}`}
            onClick={() => setActiveTab('following')}
          >
            Following (50)
            {activeTab === 'following' && <span className="fl-active-indicator" />}
          </button>
        </div>

        {/* Players List */}
        <div className="fl-list">
          {filteredList.map((player) => (
            <div 
              key={player.id} 
              className="fl-card"
              onClick={() => navigate(`/profile/${player.id}`)}
            >
              {/* Avatar with Custom Frame & Crown */}
              <div className={`fl-avatar-frame-wrap ${player.avatarFrame}`}>
                <img src={player.avatar} alt={player.name} className="fl-avatar-img" />
                {player.avatarFrame === 'crown_gold' && (
                  <img src="/gold-crown.png" alt="Crown" className="fl-crown-overlay" />
                )}
                <span className={`fl-online-dot ${player.isOnline ? 'online' : 'offline'}`} />
              </div>

              {/* Player Info */}
              <div className="fl-info">
                <div className="fl-name-row">
                  <span className="fl-name">{player.name}</span>
                  {player.isVerified && <span className="fl-verified">✓</span>}
                </div>
                
                <span className="fl-username">@{player.username}</span>

                {/* License Plate Badge */}
                <div className="fl-plate-badge">
                  <span className="fl-plate-car">🚗</span>
                  <span className="fl-plate-text">{player.vehicleNumber}</span>
                  <span className="fl-plate-check">✓</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="fl-actions">
                <button 
                  className={`fl-follow-btn ${followingMap[player.id] ? 'following' : ''}`}
                  onClick={(e) => toggleFollow(player.id, e)}
                >
                  {followingMap[player.id] ? 'Following' : 'Follow'}
                </button>

                <button 
                  className="fl-msg-btn"
                  onClick={(e) => { e.stopPropagation(); navigate(`/inbox/c1`); }}
                  title="Message Driver"
                >
                  💬
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      <BottomNav />
    </div>
  );
};

export default Followers;
export { Followers };
