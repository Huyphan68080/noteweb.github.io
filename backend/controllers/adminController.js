const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

// Login admin
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await admin.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin._id, username: admin.username }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({ message: 'Login successful', token, admin: { id: admin._id, username: admin.username } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get admin profile
exports.getProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password');
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
