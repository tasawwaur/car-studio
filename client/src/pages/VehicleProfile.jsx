import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CAR_CATALOG } from './Booking';
import REAL_PLAYERS_DATA, { getPlayerByNameOrId } from '../data/realPlayersData';
import { Header } from '../components/layout/Header';
import { VerifiedBadge } from '../components/ui/VerifiedBadge';
import { Avatar } from '../components/ui/Avatar';
import './VehicleProfile.css';

export const VehicleProfile = () => {
  const { id, vehicleId } = useParams();
  const currentId = id || vehicleId || 'v1';
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [vehicle, setVehicle] = useState(null);
  const [owner, setOwner] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  // Modals
  const [testDriveModalOpen, setTestDriveModalOpen] = useState(false);
  const [testDriveDate, setTestDriveDate] = useState('');
  const [testDriveLocation, setTestDriveLocation] = useState('Saharanpur Hub');
  const [testDriveSuccessMsg, setTestDriveSuccessMsg] = useState('');

  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);
  const [purchaseOfferPrice, setPurchaseOfferPrice] = useState('');
  const [purchaseSuccessMsg, setPurchaseSuccessMsg] = useState('');

  useEffect(() => {
    // 1. Check CAR_CATALOG first
    const catalogCar = CAR_CATALOG.find(c => c.id === currentId || c.name.toLowerCase().includes(currentId.toLowerCase()));
    
    // 2. Check REAL_PLAYERS_DATA
    const player = getPlayerByNameOrId(currentId) || REAL_PLAYERS_DATA[0];

    if (catalogCar) {
      setVehicle({
        id: catalogCar.id,
        name: catalogCar.name,
        type: catalogCar.type,
        category: catalogCar.category,
        pricePerDay: catalogCar.pricePerDay,
        regNumber: 'UP 11 AB ' + Math.floor(1000 + Math.random() * 9000),
        hp: catalogCar.hp,
        acc: catalogCar.acc,
        topSpeed: catalogCar.topSpeed,
        fuel: catalogCar.fuel,
        seats: catalogCar.seats,
        transmission: catalogCar.transmission,
        img: catalogCar.img,
        rating: catalogCar.rating,
        purchaseValuation: '₹' + (catalogCar.pricePerDay * 400).toLocaleString('en-IN')
      });
      setOwner(player);
    } else if (player) {
      setVehicle({
        id: player.id,
        name: player.vehicleName || 'Ford Mustang GT',
        type: 'Luxury Supercar',
        category: 'Supercar',
        pricePerDay: 7500,
        regNumber: player.vehicleNumber || 'UP 14 AB 0001',
        hp: '450 HP',
        acc: '4.2s',
        topSpeed: '280 km/h',
        fuel: 'Petrol V8',
        seats: 4,
        transmission: 'Automatic 10-Speed',
        img: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=1000',
        rating: '4.9 ★ (88 reviews)',
        purchaseValuation: '₹75.0 Lakh'
      });
      setOwner(player);
    } else {
      // Fallback
      setVehicle({
        id: 'v1',
        name: 'Mahindra Thar 4x4',
        type: 'SUV',
        category: 'Offroad SUV',
        pricePerDay: 3500,
        regNumber: 'UP 11 AB 8786',
        hp: '150 HP',
        acc: '10.2s',
        topSpeed: '160 km/h',
        fuel: 'Diesel',
        seats: 4,
        transmission: 'Automatic 4WD',
        img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800',
        rating: '4.9 ★ (128 reviews)',
        purchaseValuation: '₹18.5 Lakh'
      });
      setOwner(REAL_PLAYERS_DATA[0]);
    }
  }, [currentId]);

  if (!vehicle) return null;

  const handleBookRentClick = () => {
    navigate('/booking', { state: { selectedVehicleId: vehicle.id } });
  };

  const handleTestDriveSubmit = (e) => {
    e.preventDefault();
    const testDriveBooking = {
      bookingId: `TD-${Math.floor(100000 + Math.random() * 900000)}`,
      carName: vehicle.name,
      carImg: vehicle.img,
      date: testDriveDate || 'Tomorrow 11:00 AM',
      location: testDriveLocation,
      type: 'TEST_DRIVE',
      status: 'CONFIRMED',
      createdAt: new Date().toLocaleString()
    };

    try {
      const existing = JSON.parse(localStorage.getItem('cc_bookings') || '[]');
      localStorage.setItem('cc_bookings', JSON.stringify([testDriveBooking, ...existing]));
    } catch {}

    setTestDriveSuccessMsg(`🎉 Test Drive booked for ${vehicle.name} at ${testDriveLocation}!`);
    setTestDriveModalOpen(false);
    setTimeout(() => setTestDriveSuccessMsg(''), 5000);
  };

  const handlePurchaseOfferSubmit = (e) => {
    e.preventDefault();
    const deal = {
      id: Date.now().toString(),
      vehicleName: vehicle.name,
      sellerName: owner?.name || 'Verified Owner',
      offerPrice: purchaseOfferPrice || vehicle.purchaseValuation,
      timestamp: new Date().toLocaleString()
    };

    try {
      const savedDeals = JSON.parse(localStorage.getItem('cc_car_deals') || '[]');
      localStorage.setItem('cc_car_deals', JSON.stringify([deal, ...savedDeals]));
    } catch {}

    setPurchaseSuccessMsg(`🚀 Offer of ${purchaseOfferPrice || vehicle.purchaseValuation} sent to ${owner?.name}!`);
    setPurchaseModalOpen(false);
    setTimeout(() => setPurchaseSuccessMsg(''), 5000);
  };

  return (
    <div className="vp-page anim-fade-in">
      <Header showBack title={vehicle.name} />
      
      {/* Hero Banner */}
      <div className="vp-hero-container">
        <img src={vehicle.img} alt={vehicle.name} className="vp-hero-img" />
        <span className="vp-rating-tag">{vehicle.rating}</span>
      </div>
      
      <div className="vp-content">

        {/* Success Banners */}
        {testDriveSuccessMsg && <div className="vp-alert-banner success">{testDriveSuccessMsg}</div>}
        {purchaseSuccessMsg && <div className="vp-alert-banner success">{purchaseSuccessMsg}</div>}

        {/* Vehicle Header Info */}
        <div className="vp-header">
          <div className="vp-title-row">
            <h1 className="vp-title">{vehicle.name} <VerifiedBadge /></h1>
            <span className="vp-reg">{vehicle.regNumber}</span>
          </div>

          <div className="vp-pricing-pills">
            <div className="vp-price-box">
              <span className="vp-price-lbl">Daily Rental</span>
              <span className="vp-price-val gold">₹{vehicle.pricePerDay.toLocaleString('en-IN')}<small>/day</small></span>
            </div>
            <div className="vp-price-box">
              <span className="vp-price-lbl">Valuation / Buy</span>
              <span className="vp-price-val">{vehicle.purchaseValuation}</span>
            </div>
          </div>
        </div>

        {/* Detailed Specs Grid */}
        <div className="vp-specs-header">
          <h3>🏎️ Performance Specifications</h3>
        </div>
        <div className="vp-specs">
          <div className="spec"><span>Horsepower</span>⚡ {vehicle.hp}</div>
          <div className="spec"><span>0-100 Acceleration</span>⏱️ {vehicle.acc}</div>
          <div className="spec"><span>Top Speed</span>🏁 {vehicle.topSpeed}</div>
          <div className="spec"><span>Fuel Engine</span>⛽ {vehicle.fuel}</div>
          <div className="spec"><span>Transmission</span>⚙️ {vehicle.transmission}</div>
          <div className="spec"><span>Seating</span>👥 {vehicle.seats} Seats</div>
        </div>

        {/* RTO & Insurance Badge Card */}
        <div className="vp-cert-card">
          <div className="vp-cert-item">
            <span>🛡️ RTO Registered</span>
            <strong>Verified Owner</strong>
          </div>
          <div className="vp-cert-item">
            <span>📄 Zero Dep Insurance</span>
            <strong>Active Policy</strong>
          </div>
          <div className="vp-cert-item">
            <span>⚡ Inspection</span>
            <strong>150 Point Certified</strong>
          </div>
        </div>

        {/* Owner Card */}
        {owner && (
          <div className="vp-owner">
            <Avatar size="md" src={owner.avatar} name={owner.name} />
            <div className="vp-owner-info">
              <div className="vp-owner-name">{owner.name} <VerifiedBadge /></div>
              <div className="vp-owner-sub">@{owner.username} · Verified Owner</div>
            </div>
            <div className="vp-owner-actions">
              <button 
                className={`vp-follow-btn ${isFollowing ? 'following' : ''}`}
                onClick={() => setIsFollowing(!isFollowing)}
              >
                {isFollowing ? 'Following' : '+ Follow'}
              </button>
              <button 
                className="vp-chat-btn"
                onClick={() => navigate(`/inbox/${owner.id}`)}
              >
                💬 Chat
              </button>
            </div>
          </div>
        )}

        {/* Primary Action Buttons */}
        <div className="vp-cta-group">
          <button className="vp-btn-rent" onClick={handleBookRentClick}>
            ⚡ Book Self Drive / Rent (₹{vehicle.pricePerDay}/day)
          </button>
          
          <div className="vp-btn-secondary-row">
            <button className="vp-btn-sub" onClick={() => setTestDriveModalOpen(true)}>
              📅 Schedule Test Drive
            </button>
            <button className="vp-btn-sub gold" onClick={() => {
              setPurchaseOfferPrice(vehicle.purchaseValuation);
              setPurchaseModalOpen(true);
            }}>
              🏷️ Make Purchase Offer
            </button>
          </div>
        </div>

      </div>

      {/* ── TEST DRIVE MODAL ── */}
      {testDriveModalOpen && (
        <div className="vp-modal-overlay" onClick={() => setTestDriveModalOpen(false)}>
          <div className="vp-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="vp-modal-hdr">
              <h3>📅 Schedule VIP Test Drive</h3>
              <button className="vp-close-icon" onClick={() => setTestDriveModalOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleTestDriveSubmit} className="vp-modal-form">
              <p className="vp-modal-sub">Experience the thrill of {vehicle.name} with our certified instructor.</p>
              
              <label>Preferred Date & Time</label>
              <input 
                type="datetime-local" 
                className="vp-modal-input" 
                value={testDriveDate}
                onChange={(e) => setTestDriveDate(e.target.value)}
                required
              />

              <label>Test Drive Location Hub</label>
              <select 
                className="vp-modal-input"
                value={testDriveLocation}
                onChange={(e) => setTestDriveLocation(e.target.value)}
              >
                <option value="Saharanpur Main Hub">Saharanpur Main Hub</option>
                <option value="Delhi Aerocity Hub">Delhi Aerocity Hub</option>
                <option value="Dehradun Rajpur Hub">Dehradun Rajpur Hub</option>
                <option value="Doorstep Pickup (Home Delivery)">Doorstep Pickup (Home Delivery)</option>
              </select>

              <button type="submit" className="vp-modal-submit-btn">
                🏎️ Confirm Test Drive Booking
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ── PURCHASE OFFER MODAL ── */}
      {purchaseModalOpen && (
        <div className="vp-modal-overlay" onClick={() => setPurchaseModalOpen(false)}>
          <div className="vp-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="vp-modal-hdr">
              <h3>🏷️ Make Real-Time Purchase Offer</h3>
              <button className="vp-close-icon" onClick={() => setPurchaseModalOpen(false)}>✕</button>
            </div>

            <form onSubmit={handlePurchaseOfferSubmit} className="vp-modal-form">
              <p className="vp-modal-sub">Submit your official buy offer to seller {owner?.name}.</p>
              
              <label>Your Offer Amount (₹)</label>
              <input 
                type="text" 
                className="vp-modal-input" 
                value={purchaseOfferPrice}
                onChange={(e) => setPurchaseOfferPrice(e.target.value)}
                placeholder="e.g. ₹18,50,000"
                required
              />

              <button type="submit" className="vp-modal-submit-btn gold">
                🚀 Send Purchase Offer to Owner
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default VehicleProfile;
