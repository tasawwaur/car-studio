import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import { Toast } from './components/ui/Toast';
import { useAuth } from './hooks/useAuth';

// Layout
import { AppShell } from './components/layout/AppShell';

// Pages
import { Splash } from './pages/Splash';
import { Login } from './pages/auth/Login';
import { VehicleNumber } from './pages/onboarding/VehicleNumber';
import { OwnerName } from './pages/onboarding/OwnerName';
import { VehicleCheck } from './pages/onboarding/VehicleCheck';
import { OtpVerify } from './pages/onboarding/OtpVerify';
import { Success } from './pages/onboarding/Success';
import { ProfileSetup } from './pages/onboarding/ProfileSetup';

import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { Reels } from './pages/Reels';
import { CreatePost } from './pages/CreatePost';
import { PostDetail } from './pages/PostDetail';
import { Inbox } from './pages/Inbox';
import { Chat } from './pages/Chat';
import { Community } from './pages/Community';
import { Profile } from './pages/Profile';
import { Followers } from './pages/Followers';
import { Notifications } from './pages/Notifications';
import { Booking } from './pages/Booking';
import { VehicleProfile } from './pages/VehicleProfile';
import { Settings } from './pages/Settings';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/login" element={<Login />} />
      <Route path="/onboarding/vehicle-number" element={<VehicleNumber />} />
      <Route path="/onboarding/owner-name" element={<OwnerName />} />
      <Route path="/onboarding/vehicle-check" element={<VehicleCheck />} />
      <Route path="/onboarding/otp" element={<OtpVerify />} />
      <Route path="/onboarding/success" element={<Success />} />
      <Route path="/onboarding/profile-setup" element={<ProfileSetup />} />

      {/* Protected Routes inside AppShell (with Bottom Nav) */}
      <Route element={<ProtectedRoute><AppShell /></ProtectedRoute>}>
        <Route path="/home" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:userId" element={<Profile />} />
      </Route>

      {/* Protected Routes without Bottom Nav */}
      <Route element={<ProtectedRoute><AppShell hideNav /></ProtectedRoute>}>
        <Route path="/reels" element={<Reels />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/inbox/community" element={<Community />} />
        <Route path="/inbox/:userId" element={<Chat />} />
        <Route path="/followers/:userId" element={<Followers />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/booking/:vehicleId" element={<VehicleProfile />} />
        <Route path="/vehicle/:id" element={<VehicleProfile />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <BrowserRouter>
          <AppRoutes />
          <Toast />
        </BrowserRouter>
      </SocketProvider>
    </AuthProvider>
  );
}
