const mongoose = require('mongoose');
const Vendor = require('../models/vendor-model');

exports.loginVendor = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find vendor by username
    const vendor = await Vendor.findOne({ username });

    // Handle user not found case
    if (!vendor) {
      console.log(req.body.username);
      console.log(req.body.password);

      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Compare raw password (note: this is not recommended for production)
    if (vendor.password === password) {
      // Login successful
      return res.status(200).json({ message: 'Login successful!', vendor });
    } else {
      console.log(req.body.username);
      console.log(req.body.password);

      // Invalid password
      return res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred during login.' });
  }
};
