import React from 'react';
import { Outlet } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import './AppShell.css';

export const AppShell = ({ hideNav }) => {
  return (
    <div className="app-shell">
      <main className="app-content">
        <Outlet />
      </main>
      {!hideNav && <BottomNav />}
    </div>
  );
};
