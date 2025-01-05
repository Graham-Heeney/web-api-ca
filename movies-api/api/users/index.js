import express from 'express';
import User from '../../../movies-api/api/users/userModel';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';



const router = express.Router(); 

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ code: 500, msg: 'Internal Server Error', error: error.message });
    }
});

router.post('/favorites', authenticateUser, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);  // Find the user by their ID
        const movieId = req.body.movieId;  // Get the movie ID from the request body
        if (!user.favourites.includes(movieId)) {  // Check if the movie is not already in the favorites
            user.favourites.push(movieId);  // Add the movie ID to the favorites array
            await user.save();  // Save the updated user document to the database
        }
        res.status(200).json({ message: 'Movie added to favorites' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/favorites', authenticateUser, async (req, res) => {
    try {
      const user = await User.findById(req.user._id).populate('favorites');
      res.status(200).json(user.favorites);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Register (Create) User
router.post('/', asyncHandler(async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({ success: false, msg: 'Username and password are required.' });
        }
        if (req.query.action === 'register') {
            await registerUser(req, res);
        } else {
            await authenticateUser(req, res);
        }
    } catch (error) {
        // Log the error and return a generic error message
        console.error(error);
        res.status(500).json({ success: false, msg: 'Internal server error.' });
    }
}));

// Update a user
router.put('/:id', async (req, res) => {
    try {
        if (req.body._id) delete req.body._id; // Avoid overwriting _id
        const result = await User.updateOne(
            { _id: req.params.id },
            req.body
        );
        if (result.matchedCount) {
            res.status(200).json({ code: 200, msg: 'User Updated Successfully' });
        } else {
            res.status(404).json({ code: 404, msg: 'Unable to Update User' });
        }
    } catch (error) {
        res.status(500).json({ code: 500, msg: 'Internal Server Error', error: error.message });
    }
});

async function registerUser(req, res) {
    // Add input validation logic here
    await User.create(req.body);
    res.status(201).json({ success: true, msg: 'User successfully created.' });
}

async function authenticateUser(req, res) {
    const user = await User.findByUserName(req.body.username);
    if (!user) {
        return res.status(401).json({ success: false, msg: 'Authentication failed. User not found.' });
    }

    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
        const token = jwt.sign({ username: user.username }, process.env.SECRET);
        res.status(200).json({ success: true, token: 'BEARER ' + token });
    } else {
        res.status(401).json({ success: false, msg: 'Wrong password.' });
    }
}


export default router;
