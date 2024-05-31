const User = require('../models/user-model');
const Product = require('../models/product-model');
const mongoose = require('mongoose');



exports.search = async (req, res) => {
    const searchTerm = req.params.string;
    const userId = req.params.userId; // Assuming you have the user ID in the request object

    if (!searchTerm) {
        return res.status(400).json({ error: 'Search term is required' });
    }

    // Create a regular expression for case-insensitive matching
    const regex = new RegExp(searchTerm, 'i');

    try {
        // Search for users by name, excluding your own user data
        const userSearchPromise = User.find({ _id: { $ne: userId }, name: regex }).select('name rating location imageUrl');

        // Search for products by name and description
        const productSearchPromise = Product.find({ $or: [{ name: regex }, { description: regex }] });

        // Wait for both queries to complete
        const [users, products] = await Promise.all([userSearchPromise, productSearchPromise]);

        // Combine the results
        const results = {
            users,
            products
        };

        res.json(results);
    } catch (error) {
        console.error('Error searching:', error);
        res.status(500).json({ error: 'An error occurred while searching' });
    }
}
