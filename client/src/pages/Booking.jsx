import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import BottomNav from '../components/layout/BottomNav';
import './Booking.css';

export const CAR_CATALOG = [
  {
    id: 'v1',
    name: 'Mahindra Thar 4x4',
    type: 'SUV',
    category: 'Offroad SUV',
    pricePerDay: 3500,
    hp: '150 HP',
    acc: '10.2s',
    topSpeed: '160 km/h',
    fuel: 'Diesel',
    seats: 4,
    transmission: 'Automatic 4WD',
    img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800',
    location: 'Saharanpur / Delhi NCR',
    rating: '4.9 ★ (128 reviews)'
  },
  {
    id: 'v2',
    name: 'Hyundai Creta SX',
    type: 'SUV',
    category: 'Compact SUV',
    pricePerDay: 2600,
    hp: '115 HP',
    acc: '11.0s',
    topSpeed: '170 km/h',
    fuel: 'Petrol',
    seats: 5,
    transmission: 'Automatic',
    img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
    location: 'Saharanpur / Dehradun',
    rating: '4.8 ★ (95 reviews)'
  },
  {
    id: 'v3',
    name: 'Toyota Fortuner Legender',
    type: 'SUV',
    category: 'Luxury SUV',
    pricePerDay: 4500,
    hp: '204 HP',
    acc: '9.5s',
    topSpeed: '190 km/h',
    fuel: 'Diesel 4x4',
    seats: 7,
    transmission: 'Automatic',
    img: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800',
    location: 'Delhi NCR / Saharanpur',
    rating: '4.9 ★ (210 reviews)'
  },
  {
    id: 'v4',
    name: 'Ford Mustang GT V8',
    type: 'Luxury Coupe',
    category: 'Supercar',
    pricePerDay: 7500,
    hp: '450 HP',
    acc: '4.3s',
    topSpeed: '250 km/h',
    fuel: 'Petrol',
    seats: 4,
    transmission: 'Automatic 10-Speed',
    img: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800',
    location: 'Delhi NCR / Chandigarh',
    rating: '5.0 ★ (84 reviews)'
  },
  {
    id: 'v5',
    name: 'BMW M5 Competition CS',
    type: 'Luxury Sedan',
    category: 'Supercar',
    pricePerDay: 9000,
    hp: '635 HP',
    acc: '3.0s',
    topSpeed: '305 km/h',
    fuel: 'Petrol V8 Biturbo',
    seats: 5,
    transmission: 'M xDrive AWD',
    img: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
    location: 'Delhi NCR / Mumbai',
    rating: '5.0 ★ (142 reviews)'
  },
  {
    id: 'v6',
    name: 'Lamborghini Huracán STO',
    type: 'Supercar',
    category: 'Supercar',
    pricePerDay: 25000,
    hp: '640 HP',
    acc: '3.0s',
    topSpeed: '325 km/h',
    fuel: 'Petrol V10',
    seats: 2,
    transmission: 'Dual-Clutch 7-Speed',
    img: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=800',
    location: 'Delhi NCR / Mumbai',
    rating: '5.0 ★ (67 reviews)'
  }
];

const LOCATIONS = ['Saharanpur', 'Delhi NCR', 'Dehradun', 'Chandigarh', 'Jaipur', 'Mumbai'];

const formatDateForInput = (d) => {
  const pad = (n) => (n < 10 ? '0' + n : n);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const Booking = () => {
  const navigate = useNavigate();
  const routerLocation = useLocation();
  const { user } = useContext(AuthContext);

  const defaultPickup = new Date(Date.now() + 86400000);
  defaultPickup.setHours(10, 0, 0, 0);
  const defaultDrop = new Date(Date.now() + 86400000 * 3);
  defaultDrop.setHours(10, 0, 0, 0);

  const [driveMode, setDriveMode] = useState('self'); // 'self' | 'driver'
  const [pickupLoc, setPickupLoc] = useState('Saharanpur');
  const [pickupTime, setPickupTime] = useState(formatDateForInput(defaultPickup));
  const [dropTime, setDropTime] = useState(formatDateForInput(defaultDrop));
  const [selectedCategory, setSelectedCategory] = useState('All');

  const [selectedCar, setSelectedCar] = useState(null);
  const [bookingDrawerOpen, setBookingDrawerOpen] = useState(false);
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '9876543210');
  const [customerNotes, setCustomerNotes] = useState('');
  
  const [myBookings, setMyBookings] = useState([]);
  const [showMyBookingsModal, setShowMyBookingsModal] = useState(false);
  const [confirmedBookingMsg, setConfirmedBookingMsg] = useState(null);

  // Sync saved bookings from localStorage
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('cc_bookings') || '[]');
      setMyBookings(saved);
    } catch {}
  }, []);

  // Pre-select vehicle if URL state has selectedVehicleId
  useEffect(() => {
    if (routerLocation.state?.selectedVehicleId) {
      const found = CAR_CATALOG.find(c => c.id === routerLocation.state.selectedVehicleId);
      if (found) {
        setSelectedCar(found);
        setBookingDrawerOpen(true);
      }
    }
  }, [routerLocation.state]);

  const filteredCars = CAR_CATALOG.filter(car => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'SUV') return car.type === 'SUV';
    if (selectedCategory === 'Supercar') return car.category === 'Supercar';
    if (selectedCategory === 'Luxury Coupe') return car.type === 'Luxury Coupe';
    return true;
  });

  // Calculate duration & price
  const calculateBookingDetails = (car) => {
    if (!car) return { days: 1, driverFee: 0, totalAmount: 0 };
    const pDate = new Date(pickupTime);
    const dDate = new Date(dropTime);
    const diffMs = Math.max(86400000, dDate - pDate);
    const days = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
    const driverFee = driveMode === 'driver' ? 800 * days : 0;
    const baseTotal = car.pricePerDay * days;
    const totalAmount = baseTotal + driverFee;
    return { days, driverFee, baseTotal, totalAmount };
  };

  const handleOpenBooking = (car) => {
    setSelectedCar(car);
    setBookingDrawerOpen(true);
  };

  const handleConfirmBookingSubmit = (e) => {
    if (e) e.preventDefault();
    if (!selectedCar) return;

    const { days, driverFee, totalAmount } = calculateBookingDetails(selectedCar);
    const bookingId = `BK-${Math.floor(100000 + Math.random() * 900000)}`;

    const newBooking = {
      bookingId,
      carId: selectedCar.id,
      carName: selectedCar.name,
      carImg: selectedCar.img,
      driveMode,
      pickupLoc,
      pickupTime,
      dropTime,
      days,
      driverFee,
      totalAmount,
      customerName: user?.name || 'Mohammad Tasawwar',
      customerPhone,
      customerNotes,
      status: 'CONFIRMED',
      createdAt: new Date().toLocaleString()
    };

    const updated = [newBooking, ...myBookings];
    setMyBookings(updated);
    try {
      localStorage.setItem('cc_bookings', JSON.stringify(updated));
    } catch {}

    setBookingDrawerOpen(false);
    setConfirmedBookingMsg(newBooking);
  };

  return (
    <div className="bk-page anim-fade-in">
      {/* ── Top Header ── */}
      <header className="bk-header">
        <button className="bk-back-btn" onClick={() => navigate(-1)}>←</button>
        <h1 className="bk-title">Luxury Car Rentals</h1>
        
        <button 
          className="bk-my-bookings-badge"
          onClick={() => setShowMyBookingsModal(true)}
        >
          📋 My Bookings ({myBookings.length})
        </button>
      </header>

      {/* ── Main Content ── */}
      <div className="bk-content">

        {/* Segmented Control Toggle */}
        <div className="bk-toggle-pills">
          <button 
            className={`bk-pill ${driveMode === 'self' ? 'active' : ''}`}
            onClick={() => setDriveMode('self')}
          >
            🏎️ Self Drive
          </button>
          <button 
            className={`bk-pill ${driveMode === 'driver' ? 'active' : ''}`}
            onClick={() => setDriveMode('driver')}
          >
            👨‍✈️ With Chauffeur (+₹800/day)
          </button>
        </div>

        {/* Booking Form Cards */}
        <div className="bk-form">
          {/* Pickup Location Card */}
          <div className="bk-form-card">
            <span className="bk-card-icon">📍</span>
            <div className="bk-card-info">
              <span className="bk-card-label">Pickup Location</span>
              <select 
                className="bk-select-input" 
                value={pickupLoc} 
                onChange={(e) => setPickupLoc(e.target.value)}
              >
                {LOCATIONS.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Pickup Date & Time Card */}
          <div className="bk-form-card">
            <span className="bk-card-icon">📅</span>
            <div className="bk-card-info">
              <span className="bk-card-label">Pickup Date & Time</span>
              <input 
                type="datetime-local" 
                className="bk-datetime-input"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
              />
            </div>
          </div>

          {/* Drop Date & Time Card */}
          <div className="bk-form-card">
            <span className="bk-card-icon">🏁</span>
            <div className="bk-card-info">
              <span className="bk-card-label">Drop Date & Time</span>
              <input 
                type="datetime-local" 
                className="bk-datetime-input"
                value={dropTime}
                onChange={(e) => setDropTime(e.target.value)}
              />
            </div>
          </div>

          {/* Car Type Pills */}
          <div className="bk-category-pills">
            {['All', 'SUV', 'Supercar', 'Luxury Coupe'].map(cat => (
              <button 
                key={cat} 
                className={`bk-cat-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <button 
            className="bk-search-btn"
            onClick={() => {
              const el = document.getElementById('bk-catalog-grid');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            🔍 Search Available Luxury Cars ({filteredCars.length})
          </button>
        </div>

        {/* Popular & Featured Cars Catalog */}
        <div className="bk-popular-sec" id="bk-catalog-grid">
          <div className="bk-sec-hdr">
            <h2 className="bk-sec-title">Available Luxury Fleet</h2>
            <span className="bk-see-all">Showing {filteredCars.length} vehicles</span>
          </div>

          <div className="bk-cars-grid">
            {filteredCars.map(car => (
              <div 
                key={car.id} 
                className="bk-car-card" 
                onClick={() => handleOpenBooking(car)}
              >
                <div className="bk-img-wrapper">
                  <img src={car.img} alt={car.name} className="bk-car-thumb" />
                  <span className="bk-rating-badge">{car.rating}</span>
                </div>

                <div className="bk-car-meta">
                  <div className="bk-car-title-row">
                    <span className="bk-car-name">{car.name}</span>
                    <span className="bk-car-price">₹{car.pricePerDay.toLocaleString('en-IN')}/day</span>
                  </div>

                  <div className="bk-specs-pills">
                    <span className="bk-spec-pill">⚡ {car.hp}</span>
                    <span className="bk-spec-pill">⏱️ {car.acc}</span>
                    <span className="bk-spec-pill">⚙️ {car.transmission}</span>
                  </div>

                  <div className="bk-card-actions">
                    <button 
                      className="bk-instant-book-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenBooking(car);
                      }}
                    >
                      ⚡ Instant Book
                    </button>
                    <button 
                      className="bk-detail-view-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/vehicle/${car.id}`);
                      }}
                    >
                      ℹ️ Info
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── INSTANT QUICK BOOK DRAWER MODAL ── */}
      {bookingDrawerOpen && selectedCar && (
        <div className="bk-modal-overlay" onClick={() => setBookingDrawerOpen(false)}>
          <div className="bk-modal-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="bk-modal-handle" />

            <div className="bk-modal-header">
              <h3>🏎️ Confirm Luxury Booking</h3>
              <button className="bk-close-btn" onClick={() => setBookingDrawerOpen(false)}>✕</button>
            </div>

            <div className="bk-modal-car-summary">
              <img src={selectedCar.img} alt={selectedCar.name} className="bk-summary-img" />
              <div className="bk-summary-info">
                <h4>{selectedCar.name}</h4>
                <p className="bk-summary-cat">{selectedCar.category} · {selectedCar.fuel} · {selectedCar.seats} Seats</p>
                <p className="bk-summary-rate">₹{selectedCar.pricePerDay.toLocaleString('en-IN')} <span className="text-muted">/ day</span></p>
              </div>
            </div>

            {/* Calculations Breakdown */}
            {(() => {
              const { days, driverFee, baseTotal, totalAmount } = calculateBookingDetails(selectedCar);
              return (
                <div className="bk-price-breakdown">
                  <div className="bk-bd-row">
                    <span>Pickup & Drop Location</span>
                    <strong>📍 {pickupLoc}</strong>
                  </div>
                  <div className="bk-bd-row">
                    <span>Rental Duration</span>
                    <strong>{days} Day{days > 1 ? 's' : ''}</strong>
                  </div>
                  <div className="bk-bd-row">
                    <span>Base Rate ({days}d × ₹{selectedCar.pricePerDay.toLocaleString('en-IN')})</span>
                    <span>₹{baseTotal.toLocaleString('en-IN')}</span>
                  </div>
                  {driveMode === 'driver' && (
                    <div className="bk-bd-row">
                      <span>Chauffeur Charge ({days}d × ₹800)</span>
                      <span>+₹{driverFee.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="bk-bd-row total">
                    <span>Total Amount Payable</span>
                    <span className="gold-text">₹{totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              );
            })()}

            {/* Form Inputs */}
            <form onSubmit={handleConfirmBookingSubmit} className="bk-checkout-form">
              <label className="bk-input-label">Customer Mobile Number</label>
              <input 
                type="tel" 
                className="bk-text-input" 
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="Enter 10-digit mobile number"
                required
              />

              <label className="bk-input-label">Pickup Address / Special Notes (Optional)</label>
              <input 
                type="text" 
                className="bk-text-input" 
                value={customerNotes}
                onChange={(e) => setCustomerNotes(e.target.value)}
                placeholder="e.g. Flight arrival time, hotel lobby delivery..."
              />

              <div className="bk-guarantee-badges">
                <span>🛡️ Zero Security Deposit</span>
                <span>⚡ Doorstep Delivery</span>
                <span>✓ Fully Insured</span>
              </div>

              <button type="submit" className="bk-confirm-submit-btn">
                🎉 Confirm & Reserve Now
              </button>
            </form>

          </div>
        </div>
      )}

      {/* ── SUCCESS BOOKING NOTIFICATION MODAL ── */}
      {confirmedBookingMsg && (
        <div className="bk-modal-overlay" onClick={() => setConfirmedBookingMsg(null)}>
          <div className="bk-success-modal" onClick={(e) => e.stopPropagation()}>
            <div className="bk-success-icon">🎉</div>
            <h2>Booking Confirmed!</h2>
            <p className="bk-booking-id">Booking ID: <strong>{confirmedBookingMsg.bookingId}</strong></p>

            <div className="bk-success-card">
              <img src={confirmedBookingMsg.carImg} alt={confirmedBookingMsg.carName} />
              <div>
                <h3>{confirmedBookingMsg.carName}</h3>
                <p>📍 {confirmedBookingMsg.pickupLoc} ({confirmedBookingMsg.driveMode === 'self' ? 'Self Drive' : 'With Driver'})</p>
                <p className="gold-text"><strong>₹{confirmedBookingMsg.totalAmount.toLocaleString('en-IN')} Total Paid</strong></p>
              </div>
            </div>

            <p className="bk-success-note">
              Vehicle delivery instructions and executive contact details have been stored in your active bookings list.
            </p>

            <div className="bk-success-actions">
              <button 
                className="bk-success-btn-primary"
                onClick={() => {
                  setConfirmedBookingMsg(null);
                  setShowMyBookingsModal(true);
                }}
              >
                📋 View Active Bookings
              </button>
              <button 
                className="bk-success-btn-sec"
                onClick={() => setConfirmedBookingMsg(null)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MY BOOKINGS MODAL DRAWER ── */}
      {showMyBookingsModal && (
        <div className="bk-modal-overlay" onClick={() => setShowMyBookingsModal(false)}>
          <div className="bk-modal-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="bk-modal-handle" />

            <div className="bk-modal-header">
              <h3>📋 My Car Bookings & Reservations</h3>
              <button className="bk-close-btn" onClick={() => setShowMyBookingsModal(false)}>✕</button>
            </div>

            <div className="bk-my-bookings-list">
              {myBookings.length === 0 ? (
                <div className="bk-empty-bookings">
                  <span>🚗</span>
                  <p>No active bookings yet.</p>
                  <button className="bk-cat-btn active" onClick={() => setShowMyBookingsModal(false)}>
                    Browse Available Cars
                  </button>
                </div>
              ) : (
                myBookings.map(b => (
                  <div key={b.bookingId} className="bk-my-booking-card">
                    <div className="bk-mb-header">
                      <span className="bk-mb-id">ID: {b.bookingId}</span>
                      <span className="bk-mb-status-tag">✓ {b.status}</span>
                    </div>

                    <div className="bk-mb-body">
                      <img src={b.carImg} alt={b.carName} className="bk-mb-img" />
                      <div className="bk-mb-info">
                        <h4>{b.carName}</h4>
                        <p>📍 Pickup: <strong>{b.pickupLoc}</strong></p>
                        <p>⏱️ Duration: <strong>{b.days} Day{b.days > 1 ? 's' : ''}</strong> ({b.driveMode === 'self' ? 'Self Drive' : 'With Driver'})</p>
                        <p className="gold-text">Total: <strong>₹{b.totalAmount.toLocaleString('en-IN')}</strong></p>
                      </div>
                    </div>

                    <div className="bk-mb-footer">
                      <span className="bk-mb-time">Created: {b.createdAt}</span>
                      <button className="bk-call-agent-btn" onClick={() => alert(`Calling CarConnect Support for Booking ${b.bookingId}`)}>
                        📞 Support
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default Booking;
export { Booking };
