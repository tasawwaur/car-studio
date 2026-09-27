import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import REAL_PLAYERS_DATA, { getPlayerByNameOrId, getUserAvatar } from '../data/realPlayersData';
import BottomNav from '../components/layout/BottomNav';
import './Profile.css';

/* ── Sample User Posts, Reels & Garage Vehicles ── */
const USER_POSTS = [
  { id: 'p1', img: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800', type: 'image' },
  { id: 'p2', img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800', type: 'image' },
  { id: 'p3', img: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800', type: 'image' },
  { id: 'p4', img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800', type: 'image' },
  { id: 'p5', img: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800', type: 'image' },
  { id: 'p6', img: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=800', type: 'image' }
];

const USER_REELS = [
  { id: 'r1', img: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800', title: 'Mountain Drift 🏎️', views: '45.2K' },
  { id: 'r2', img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800', title: 'Highway Launch ⚡', views: '128K' },
  { id: 'r3', img: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800', title: 'V8 Exhaust Sound 🔥', views: '89.4K' }
];

const GARAGE_VEHICLES = [
  {
    id: 'v1',
    name: 'Porsche 911 GT3 RS',
    price: '₹3.80 Cr',
    power: '525 HP',
    topSpeed: '296 KM/H',
    acc: '3.2s (0-100)',
    status: 'FOR SALE · Track Spec',
    forSale: true,
    img: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800'
  },
  {
    id: 'v2',
    name: 'Lamborghini Huracán STO',
    price: '₹4.90 Cr',
    power: '640 HP',
    topSpeed: '325 KM/H',
    acc: '3.0s (0-100)',
    status: 'FOR SALE · V10 Beast',
    forSale: true,
    img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800'
  },
  {
    id: 'v3',
    name: 'Mahindra Thar 4x4 Offroad',
    price: '₹18.5 Lakh',
    power: '150 HP',
    topSpeed: '160 KM/H',
    acc: '10.2s (0-100)',
    status: 'FOR SALE · Offroad Spec',
    forSale: true,
    img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800'
  },
  {
    id: 'v4',
    name: 'Mercedes-AMG G63',
    price: '₹3.30 Cr',
    power: '585 HP',
    topSpeed: '240 KM/H',
    acc: '4.5s (0-100)',
    status: 'IN GARAGE · Verified Owner',
    forSale: false,
    img: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800'
  }
];

const Profile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const fileInputRef = useRef(null);

  // Check if viewing a specific player from 100 Real Players dataset or sample alias
  const realPlayer = userId ? getPlayerByNameOrId(userId) : null;

  const isMe = !userId || userId === 'me' || userId === 'my_user_id' || (user?._id && realPlayer?.id === user._id);

  const profileName = realPlayer ? realPlayer.name : (user?.name || 'Mohammad Tasawwar');
  const username = realPlayer ? `@${realPlayer.username}` : `@${user?.username || 'tasavvur_malik'}`;
  const vehicleNumber = realPlayer ? realPlayer.vehicleNumber : (user?.vehicleNumber || 'UP 11 AB 1234');
  const postsCount = realPlayer ? '124' : '124';
  const followersCount = realPlayer ? (realPlayer.followersCount || '1,250') : (user?.followersCount || '1,250');
  const followingCount = realPlayer ? (realPlayer.followingCount || '382') : (user?.followingCount || '382');
  const isVerified = realPlayer ? (realPlayer.isVerified !== false) : true;
  
  const coverImage = realPlayer?.coverImage || 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1000';

  const [activeTab, setActiveTab] = useState('posts'); // 'posts' | 'reels' | 'vehicles'
  const [avatar, setAvatar] = useState(
    realPlayer ? realPlayer.avatar : (user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300')
  );
  const [bio, setBio] = useState(
    realPlayer ? realPlayer.bio : (user?.bio || 'Car enthusiast | Travel | Photography')
  );
  const [locationText, setLocationText] = useState('Saharanpur, Uttar Pradesh');
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  
  const [buyModalVehicle, setBuyModalVehicle] = useState(null);
  const [offerPrice, setOfferPrice] = useState('');
  const [dealSuccessMsg, setDealSuccessMsg] = useState('');

  const handleOpenBuyModal = (vehicle, e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setBuyModalVehicle(vehicle);
    setOfferPrice(vehicle.price);
  };

  const handleSendDealOffer = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!buyModalVehicle) return;
    
    const deal = {
      id: Date.now().toString(),
      vehicleName: buyModalVehicle.name,
      sellerName: profileName,
      offerPrice: offerPrice || buyModalVehicle.price,
      timestamp: new Date().toLocaleString()
    };

    try {
      const savedDeals = JSON.parse(localStorage.getItem('cc_car_deals') || '[]');
      localStorage.setItem('cc_car_deals', JSON.stringify([deal, ...savedDeals]));
    } catch {}

    setDealSuccessMsg(`🎉 Real-Time Deal Offer of ${offerPrice || buyModalVehicle.price} submitted to ${profileName}!`);
    setBuyModalVehicle(null);
    setTimeout(() => setDealSuccessMsg(''), 5000);
  };

  useEffect(() => {
    if (realPlayer) {
      setAvatar(realPlayer.avatar);
      setBio(realPlayer.bio || 'Car enthusiast | Travel | High performance drives');
    } else if (user) {
      setAvatar(user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300');
      setBio(user.bio || 'Car enthusiast | Travel | Photography');
    }
  }, [userId, realPlayer, user]);

  /* ── Avatar Photo Upload ── */
  const handleAvatarClick = () => {
    if (isMe) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatar(url);
    }
  };

  return (
    <div className="pf-page">
      {/* ── Hidden File Input ── */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        style={{ display: 'none' }} 
      />

      {/* ── Top Cover Image Banner with Back & Edit Buttons ── */}
      <div className="pf-cover-banner">
        <img src={coverImage} alt="Car Cover" className="pf-cover-img" />
        
        {/* Header Navigation Buttons over Cover */}
        <div className="pf-cover-overlay-btns">
          <button className="pf-cover-back-btn" onClick={() => navigate(-1)} aria-label="Back">
            ←
          </button>

          {isMe && (
            <button className="pf-cover-edit-btn" onClick={() => navigate('/settings')}>
              Edit
            </button>
          )}
        </div>
      </div>

      {/* ── Main Profile Body Container ── */}
      <div className="pf-body">

        {/* ── Profile Header Row (Avatar + Edit Profile Button) ── */}
        <div className="pf-avatar-header-row">
          <div className="pf-avatar-wrapper" onClick={handleAvatarClick}>
            <img src={avatar} alt={profileName} className="pf-avatar-img" />
            <span className="pf-avatar-online-dot" title="Verified Account">✓</span>
          </div>

          <div className="pf-header-actions">
            {isMe ? (
              <button className="pf-edit-profile-btn" onClick={() => setIsEditingBio(b => !b)}>
                Edit Profile
              </button>
            ) : (
              <button 
                className={`pf-edit-profile-btn ${isFollowing ? 'following' : ''}`}
                onClick={() => setIsFollowing(f => !f)}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
            )}
          </div>
        </div>

        {/* ── Name & Username ── */}
        <div className="pf-identity-section">
          <div className="pf-name-row">
            <h1 className="pf-name">{profileName}</h1>
            {isVerified && <span className="pf-blue-badge" title="Verified Driver">✓</span>}
          </div>
          <span className="pf-username">{username}</span>
        </div>

        {/* ── 3 Stats Columns (Posts | Followers | Following) ── */}
        <div className="pf-stats-container">
          <div className="pf-stat-item">
            <span className="pf-stat-value">{postsCount}</span>
            <span className="pf-stat-title">Posts</span>
          </div>

          <div className="pf-stat-divider" />

          <div 
            className="pf-stat-item clickable"
            onClick={() => navigate('/followers?tab=followers')}
            title="View Real Followers"
          >
            <span className="pf-stat-value">{followersCount}</span>
            <span className="pf-stat-title">Followers</span>
          </div>

          <div className="pf-stat-divider" />

          <div 
            className="pf-stat-item clickable"
            onClick={() => navigate('/followers?tab=following')}
            title="View Real Following"
          >
            <span className="pf-stat-value">{followingCount}</span>
            <span className="pf-stat-title">Following</span>
          </div>
        </div>

        {/* ── Bio & Location ── */}
        <div className="pf-bio-location-box">
          {isMe && isEditingBio ? (
            <input 
              type="text" 
              className="pf-bio-edit-input" 
              value={bio} 
              onChange={(e) => setBio(e.target.value)}
              onBlur={() => setIsEditingBio(false)}
              autoFocus
            />
          ) : (
            <p className="pf-bio-paragraph">{bio}</p>
          )}

          <div className="pf-location-row">
            <span className="pf-location-pin">📍</span>
            <span className="pf-location-text">{locationText}</span>
          </div>
        </div>

        {/* ── Vehicle License Plate & Verification Pill Row ── */}
        <div className="pf-vehicle-row">
          <div className="pf-vehicle-plate-pill" onClick={() => navigate('/booking')}>
            <span className="pf-plate-flag">🚙</span>
            <span className="pf-plate-text">{vehicleNumber}</span>
          </div>

          <div className="pf-verified-vehicle-pill">
            <span className="pf-green-check-dot">✓</span>
            <span className="pf-verified-text">Verified Vehicle</span>
          </div>
        </div>

        {/* ── Tabs Navigation (Posts | Reels | Vehicles) ── */}
        <div className="pf-tab-bar">
          <button 
            className={`pf-tab-btn ${activeTab === 'posts' ? 'active' : ''}`}
            onClick={() => setActiveTab('posts')}
          >
            Posts
            {activeTab === 'posts' && <span className="pf-tab-underline" />}
          </button>

          <button 
            className={`pf-tab-btn ${activeTab === 'reels' ? 'active' : ''}`}
            onClick={() => setActiveTab('reels')}
          >
            Reels
            {activeTab === 'reels' && <span className="pf-tab-underline" />}
          </button>

          <button 
            className={`pf-tab-btn ${activeTab === 'vehicles' ? 'active' : ''}`}
            onClick={() => setActiveTab('vehicles')}
          >
            Vehicles
            {activeTab === 'vehicles' && <span className="pf-tab-underline" />}
          </button>
        </div>

        {/* ── Dynamic Tab Content (Posts | Reels | Garage Vehicles) ── */}
        {activeTab === 'posts' && (
          <div className="pf-grid-container">
            {USER_POSTS.map((p) => (
              <div key={p.id} className="pf-grid-card" onClick={() => navigate(`/post/${p.id}`)}>
                <img src={p.img} alt="Car post" className="pf-grid-thumb" />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reels' && (
          <div className="pf-grid-container">
            {USER_REELS.map((r) => (
              <div key={r.id} className="pf-grid-card reel-card" onClick={() => navigate('/reels')}>
                <img src={r.img} alt={r.title} className="pf-grid-thumb" />
                <div className="reel-overlay-badge">
                  <span>▶ {r.views}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Real-Time Success Deal Banner ── */}
        {dealSuccessMsg && (
          <div className="pf-deal-toast-banner">
            {dealSuccessMsg}
          </div>
        )}

        {activeTab === 'vehicles' && (
          <div className="pf-garage-vehicles-list">
            {GARAGE_VEHICLES.map((v) => (
              <div key={v.id} className="pf-vehicle-card" onClick={() => navigate(`/booking/${v.id}`)}>
                <img src={v.img} alt={v.name} className="pf-vehicle-img" />
                <div className="pf-vehicle-info">
                  <div className="pf-vh-header">
                    <h3 className="pf-vh-name">{v.name}</h3>
                    <span className="pf-vh-price">{v.price}</span>
                  </div>
                  <p className="pf-vh-status">✓ {v.status}</p>
                  <div className="pf-vh-specs-grid">
                    <div className="pf-spec-tag">⚡ {v.power}</div>
                    <div className="pf-spec-tag">🏎️ {v.topSpeed}</div>
                    <div className="pf-spec-tag">⏱️ {v.acc}</div>
                  </div>

                  {v.forSale && (
                    <button 
                      className="pf-buy-deal-btn"
                      onClick={(e) => handleOpenBuyModal(v, e)}
                    >
                      🏷️ Make Offer / Buy ({v.price})
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* ── REAL-TIME CAR PURCHASE / DEAL OFFER MODAL DRAWER ── */}
      {buyModalVehicle && (
        <div className="deal-modal-overlay" onClick={() => setBuyModalVehicle(null)}>
          <div className="deal-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="deal-modal-handle" />
            
            <div className="deal-modal-header">
              <h3>🏎️ Real-Time Car Deal Offer</h3>
              <button className="deal-close-btn" onClick={() => setBuyModalVehicle(null)}>✕</button>
            </div>

            <div className="deal-vehicle-preview">
              <img src={buyModalVehicle.img} alt={buyModalVehicle.name} className="deal-preview-img" />
              <div className="deal-preview-text">
                <h4>{buyModalVehicle.name}</h4>
                <p className="deal-asking-price">Asking Price: <strong>{buyModalVehicle.price}</strong></p>
                <p className="deal-seller-name">Seller: <span>{profileName}</span></p>
              </div>
            </div>

            <form className="deal-offer-form" onSubmit={handleSendDealOffer}>
              <label className="deal-input-label">Your Offer Price (₹)</label>
              <input 
                type="text" 
                className="deal-price-input" 
                value={offerPrice}
                onChange={(e) => setOfferPrice(e.target.value)}
                placeholder="e.g. ₹3,75,00,000"
              />

              <div className="deal-info-pills">
                <span className="deal-info-pill">✓ RTO Verified</span>
                <span className="deal-info-pill">✓ Insured</span>
                <span className="deal-info-pill">⚡ {buyModalVehicle.power}</span>
              </div>

              <button type="submit" className="deal-submit-btn">
                🚀 Submit Deal Offer ({offerPrice || buyModalVehicle.price})
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ── Bottom Nav Bar ── */}
      <BottomNav />
    </div>
  );
};

export default Profile;
export { Profile };
