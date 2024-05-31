const mongoose = require('mongoose');
const User = require('../models/user-model');

exports.loginUser = async (req, res) => {
  console.log(req.body);
  try {
    // Find user by unique phone number
    const user = await User.findOne({ unique_phone_number: req.body.unique_phone_number }).populate('specialOffer');
    user.playerId = req.body.playerId;
    console.log(user.playerId);
    await user.save();
    // Handle user not found case
    if (!user) {
      return res.status(401).json({ error: 'Invalid phone number' });
    }

    // Compare raw password (not recommended for production):
    if (user && user.password === req.body.password) {
      // Login successful, generate and send a token (optional)
      // ... (implement token generation and sending logic)
      return res.status(200).json({ message: 'Login successful!', user });
    } else {
      // Invalid password
      return res.status(401).json({ error: 'Invalid phone number or password' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred during login.' });
  }
};
