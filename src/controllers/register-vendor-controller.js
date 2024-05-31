const mongoose = require('mongoose');
const Vendor = require('../models/vendor-model'); // Correct the model name for consistency

exports.registerVendor = async (req, res) => {
    const { username, shopAddress, password, name, phoneNumber } = req.body;
    const regex = /^\+88/;

    // Basic validation
    if (!phoneNumber || typeof phoneNumber !== 'string' || phoneNumber.length !== 14 || !regex.test(phoneNumber)) {
        return res.status(400).json({ error: 'Phone number must be a 14-character Bangladeshi number starting with +88' });
    }
    if (!shopAddress || shopAddress.trim().length === 0) {
        return res.status(400).json({ error: 'Shop address is required' });
    }
    if (!username || username.trim().length === 0) {
        return res.status(400).json({ error: 'Username is required' });
    }
    if (!name || name.trim().length === 0) {
        return res.status(400).json({ error: 'Name is required' });
    }
    if (!password || password.trim().length === 0) {
        return res.status(400).json({ error: 'Password is required' });
    }

    try {
        // Check for unique username and shop address
        const existingUser = await Vendor.findOne({ $or: [{ username }, { shopAddress }] });
        if (existingUser) {
            if (existingUser.username === username) {
                return res.status(409).json({ error: 'Username already exists' });
            }
            if (existingUser.shopAddress === shopAddress) {
                return res.status(409).json({ error: 'Shop address already registered' });
            }
        }

        // Create new vendor
        const newVendor = new Vendor({ username, shopAddress, password, name, phoneNumber });
        await newVendor.save();

        res.status(201).json({ message: 'Vendor created successfully!', vendor: newVendor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred during registration' });
    }
};
