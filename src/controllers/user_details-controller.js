const mongoose = require('mongoose');
const User = require('../models/user-model');

exports.getUserDetails = async (req, res) => {
    const userId = req.params.nidNumber; // Assuming you have a route parameter named "id"

    try {
        const user = await User.findOne({unique_phone_number:userId}); // Find user by ID using Mongoose
        if (!user) {
            return res.status(404).json({ message: 'User not found' }); // Handle user not found
        }

        // Send user details as a JSON response
        res.json(user);
    } catch (err) {
        console.error('Error fetching user details:', err);
        res.status(500).json({ message: 'Internal server error' }); // Handle errors gracefully
    }
};
