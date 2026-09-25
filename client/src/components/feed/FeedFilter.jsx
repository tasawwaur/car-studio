import React from 'react';
import './FeedFilter.css';

const FeedFilter = () => {
  return (
    <div className="feed-filter">
      <div className="filter-tab active">For You</div>
      <div className="filter-tab">Following</div>
      <div className="filter-tab">Nearby</div>
      <div className="filter-tab">Cars</div>
      <div className="filter-tab">Reels</div>
    </div>
  );
};

export default FeedFilter;

export { FeedFilter };
