require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const adminRoutes = require('./routes/adminRoutes');
const noteRoutes = require('./routes/noteRoutes');
const Admin = require('./models/Admin');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    initializeAdmin();
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  });

// Initialize default admin
async function initializeAdmin() {
  try {
    const adminExists = await Admin.findOne({ username: process.env.ADMIN_USERNAME });

    if (!adminExists) {
      const newAdmin = new Admin({
        username: process.env.ADMIN_USERNAME,
        password: process.env.ADMIN_PASSWORD,
      });

      await newAdmin.save();
      console.log(`Admin user "${process.env.ADMIN_USERNAME}" created successfully`);
    }
  } catch (error) {
    console.error('Error initializing admin:', error.message);
  }
}

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/notes', noteRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
