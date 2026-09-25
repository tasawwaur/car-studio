import React from 'react';
import { useNavigate } from 'react-router-dom';
import { VerifiedBadge } from '../ui/VerifiedBadge';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import './VehicleCard.css';

export const VehicleCard = ({ vehicle }) => {
  const navigate = useNavigate();

  return (
    <div className="vehicle-card">
      <div className="vc-image">
        <img src={vehicle.images?.[0] || 'https://images.unsplash.com/photo-1550314488-823c9ffb8118'} alt={vehicle.make} />
        <div className="vc-category">{vehicle.category || 'Sedan'}</div>
      </div>
      <div className="vc-content">
        <div className="vc-header">
          <h3 className="vc-title">{vehicle.make} {vehicle.model} <span>{vehicle.year}</span></h3>
          {vehicle.verified && <VerifiedBadge />}
        </div>
        
        <div className="vc-owner">
          <Avatar src={vehicle.owner?.avatar} name={vehicle.owner?.name} size="xs" />
          <span>{vehicle.owner?.name}</span>
        </div>

        <div className="vc-footer">
          {vehicle.for_booking ? (
            <div className="vc-price">₹{vehicle.price_per_day}<span>/day</span></div>
          ) : (
            <div className="vc-reg">{vehicle.regNumber}</div>
          )}
          
          <Button size="sm" onClick={() => navigate(vehicle.for_booking ? `/booking/${vehicle._id}` : `/vehicle/${vehicle._id}`)}>
            {vehicle.for_booking ? 'Book Now' : 'View'}
          </Button>
        </div>
      </div>
    </div>
  );
};
