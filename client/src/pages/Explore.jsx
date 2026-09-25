import React from 'react';
import Header from '../components/layout/Header';
import BottomNav from '../components/layout/BottomNav';
import './Explore.css';

const Explore = () => {
  return (
    <div className="explore-page pb-nav">
      <Header 
        leftContent={<h1 className="header-title">Explore</h1>}
        showNotif={false}
        showSearch={false}
        rightContent={<span className="filter-icon">⚙️</span>}
      />
      
      <main className="explore-content pt-header">
        <div className="search-bar-container">
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Search users, vehicles, posts..." />
          </div>
        </div>

        <div className="filter-pills-scroll">
          <div className="pill active-gradient">All</div>
          <div className="pill">Users</div>
          <div className="pill">Vehicles</div>
          <div className="pill">Posts</div>
          <div className="pill">Reels</div>
        </div>

        <section className="explore-section">
          <div className="section-header">
            <h2>Nearby Users</h2>
            <span className="see-all">See All</span>
          </div>
          <div className="horizontal-scroll">
            <div className="user-card">
              <img src="https://ui-avatars.com/api/?name=A&background=101827&color=fff" alt="Aman" className="user-avatar" />
              <span className="name">Aman</span>
              <span className="vehicle">Thar</span>
            </div>
            <div className="user-card">
              <img src="https://ui-avatars.com/api/?name=P&background=101827&color=fff" alt="Pooja" className="user-avatar" />
              <span className="name">Pooja</span>
              <span className="vehicle"></span>
            </div>
            <div className="user-card">
              <img src="https://ui-avatars.com/api/?name=V&background=101827&color=fff" alt="Vikram" className="user-avatar" />
              <span className="name">Vikram</span>
              <span className="vehicle">Scorpio</span>
            </div>
            <div className="user-card">
              <img src="https://ui-avatars.com/api/?name=N&background=101827&color=fff" alt="Neha" className="user-avatar" />
              <span className="name">Neha</span>
              <span className="vehicle">City</span>
            </div>
          </div>
        </section>

        <section className="explore-section">
          <div className="section-header">
            <h2>Popular Vehicles</h2>
            <span className="see-all">See All</span>
          </div>
          <div className="horizontal-scroll gap-12">
            <div className="vehicle-card">
              <div className="vehicle-img-placeholder">🚗</div>
              <span className="v-name">Thar</span>
              <span className="v-count">1.2M posts</span>
            </div>
            <div className="vehicle-card">
              <div className="vehicle-img-placeholder">🚙</div>
              <span className="v-name">Creta</span>
              <span className="v-count">995k posts</span>
            </div>
            <div className="vehicle-card">
              <div className="vehicle-img-placeholder">🚓</div>
              <span className="v-name">Fortuner</span>
              <span className="v-count">629k posts</span>
            </div>
          </div>
        </section>

        <section className="explore-section">
          <div className="section-header">
            <h2>Trending Posts</h2>
          </div>
          <div className="trending-post-row">
            <div className="post-info">
              <div className="user-row">
                <img src="https://ui-avatars.com/api/?name=NV&background=4F46E5&color=fff" alt="Neha Verma" className="small-avatar" />
                <div className="name-time">
                  <span className="name">Neha Verma</span>
                  <span className="time">2h</span>
                </div>
                <button className="follow-btn">Follow</button>
              </div>
            </div>
            <div className="post-preview">
              <div className="preview-placeholder">🏔️</div>
            </div>
          </div>
        </section>
      </main>

      <BottomNav activeTab="explore" />
    </div>
  );
};


export { Explore };
