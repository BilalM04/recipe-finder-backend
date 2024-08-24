const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// Get a user's recipes
router.get('/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user.recipes); // Return array of URIs
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Post a new recipe to a user
router.post('/:email', async (req, res) => {
    console.log('Request Body:', req.body); // Log the entire body
    console.log('Request Headers:', req.headers); // Log the headers for debugging

    const { uri } = req.body;

    console.log('Received URI:', uri); // Log the received URI

    if (!uri || typeof uri !== 'string' || uri.trim() === '') {
        return res.status(400).json({ message: 'Invalid URI' });
    }

    try {
        const userEmail = req.params.email;
        let user = await User.findOne({ email: userEmail });

        if (!user) {
            user = await User.create({ email: userEmail }); // Create a new user if not found
        }

        if (user.recipes.includes(uri)) {
            return res.status(409).json({ message: 'Recipe already exists for this user!' });
        }

        user.recipes.push(uri);
        await user.save();
        res.status(201).json({ uri });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a recipe from a user's collection
router.delete('/:email/:uri', async (req, res) => {
    console.log('Request Body:', req.body); // Log the entire body
    console.log('Request Headers:', req.headers); // Log the headers for debugging

    const userEmail = req.params.email;
    const uri = decodeURI(req.params.uri);

    console.log('Received URI:', uri); // Log the received URI

    if (!uri || typeof uri !== 'string' || uri.trim() === '') {
        return res.status(400).json({ message: 'Invalid URI' });
    }

    try {
        const user = await User.findOne({ email: userEmail });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const recipeIndex = user.recipes.indexOf(uri);

        if (recipeIndex === -1) {
            return res.status(404).json({ message: 'Recipe not found for this user' });
        }

        user.recipes.splice(recipeIndex, 1);
        await user.save();

        res.json({ message: 'Recipe deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
