const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');
const postRoutes = require('./routes/postRoutes');
const reelRoutes = require('./routes/reelRoutes');
const socialRoutes = require('./routes/socialRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const verificationRoutes = require('./routes/verificationRoutes');

const app = express();
const server = http.createServer(app);

// Keep Socket.IO logic
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }
});

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/reels', reelRoutes);
app.use('/api/social', socialRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/verification', verificationRoutes);

// Socket.IO
const users = new Map();

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) return next(new Error('Authentication error'));
  // Assume basic token validation for socket or store userId directly for demo
  // A real implementation should verify JWT here.
  const userId = socket.handshake.auth.userId;
  if (!userId) return next(new Error('User ID missing'));
  socket.userId = userId;
  next();
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.userId}`);
  users.set(socket.userId, socket.id);
  io.emit('user_status_change', { userId: socket.userId, status: 'online' });

  socket.on('join_public', () => {
    socket.join('public_room');
  });

  socket.on('join_community', () => {
    socket.join('community_room');
  });

  socket.on('send_message', (data) => {
    if (data.roomType === 'community') {
      io.to('community_room').emit('receive_message', data);
    } else if (data.roomType === 'public') {
      io.to('public_room').emit('receive_message', data);
    } else {
      const receiverSocketId = users.get(data.receiver);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('receive_message', data);
      }
    }
  });

  socket.on('typing_start', (data) => {
    const receiverSocketId = users.get(data.receiver);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('typing_start', data);
    }
  });

  socket.on('typing_stop', (data) => {
    const receiverSocketId = users.get(data.receiver);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('typing_stop', data);
    }
  });

  socket.on('disconnect', () => {
    users.delete(socket.userId);
    io.emit('user_status_change', { userId: socket.userId, status: 'offline' });
    console.log(`User disconnected: ${socket.userId}`);
  });
});

// MongoDB connect with retry
const connectDB = () => {
  mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/car-connect', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    setTimeout(connectDB, 5000);
  });
};

connectDB();

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
