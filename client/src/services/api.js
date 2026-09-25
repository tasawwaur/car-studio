import axios from 'axios';

const api = axios.create({
  baseURL: '/api'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('cc_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data)
};

export const verification = {
  checkVehicle: (data) => api.post('/verification/check-vehicle', data),
  verifyOwner: (data) => api.post('/verification/verify-owner', data),
  sendOtp: (data) => api.post('/verification/send-otp', data),
  verifyOtp: (data) => api.post('/verification/verify-otp', data)
};

export const posts = {
  getFeed: (params) => api.get('/posts', { params }),
  createPost: (data) => api.post('/posts', data),
  getPost: (id) => api.get(`/posts/${id}`),
  likePost: (id) => api.post(`/posts/${id}/like`),
  addComment: (id, text) => api.post(`/posts/${id}/comments`, { text }),
  getComments: (id) => api.get(`/posts/${id}/comments`),
  getUserPosts: (userId) => api.get(`/users/${userId}/posts`),
  uploadMedia: (formData) => api.post('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
};

export const reels = {
  getReels: (params) => api.get('/reels', { params }),
  createReel: (data) => api.post('/reels', data),
  likeReel: (id) => api.post(`/reels/${id}/like`),
  addComment: (id, text) => api.post(`/reels/${id}/comments`, { text }),
  incrementView: (id) => api.post(`/reels/${id}/view`),
  getUserReels: (userId) => api.get(`/users/${userId}/reels`)
};

export const social = {
  followUser: (id) => api.post(`/users/${id}/follow`),
  unfollowUser: (id) => api.post(`/users/${id}/unfollow`),
  getFollowers: (id) => api.get(`/users/${id}/followers`),
  getFollowing: (id) => api.get(`/users/${id}/following`),
  getNotifications: () => api.get('/notifications'),
  getUserProfile: (id) => api.get(`/users/${id}`),
  searchUsers: (q) => api.get('/users/search', { params: { q } })
};

export const chat = {
  getFriendsList: () => api.get('/chat/friends'),
  getPrivateHistory: (id) => api.get(`/chat/history/${id}`),
  getCommunityHistory: () => api.get('/chat/community'),
  sendMessage: (data) => api.post('/chat/send', data),
  uploadFile: (formData) => api.post('/upload/chat', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
};

export const booking = {
  getAvailableCars: (params) => api.get('/bookings/cars', { params }),
  createBooking: (data) => api.post('/bookings', data),
  getMyBookings: () => api.get('/bookings/me'),
  cancelBooking: (id) => api.post(`/bookings/${id}/cancel`),
  getCarDetail: (id) => api.get(`/vehicles/${id}`)
};
