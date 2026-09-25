import React from 'react';
import Header from '../components/layout/Header';
import BottomNav from '../components/layout/BottomNav';
import Stories from '../components/feed/Stories';
import FeedFilter from '../components/feed/FeedFilter';
import PostCard from '../components/cards/PostCard';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page pb-nav">
      <Header 
        leftContent={<div className="location-header">📍 Saharanpur</div>}
        showNotif={true}
        showSearch={true}
      />
      
      <main className="home-content pt-header">
        <Stories />
        <FeedFilter />
        
        <div className="feed-posts">
          <PostCard 
            user={{ name: 'Rahul Sharma', avatar: 'https://ui-avatars.com/api/?name=RS&background=4F46E5&color=fff' }}
            location="Saharanpur"
            time="2h"
            mediaPlaceholder={{ emoji: '🚗', gradient: 'linear-gradient(45deg, #1e293b, #0f172a)' }}
            caption="#crota #roadtrip #mountain #drive"
            likes="1.2K"
            comments="84"
            shares="32"
            pageCount="1/5"
          />
        </div>
      </main>

      <BottomNav activeTab="home" />
    </div>
  );
};


export { Home };
