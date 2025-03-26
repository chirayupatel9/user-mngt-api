require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose'); // Import mongoose
const app = express();
const userRoutes = require('./routes/userRoutes'); // Import user routes
const basicRoutes = require('./routes/basicRoutes'); // Import basic routes
const PORT = process.env.PORT || 3000; // Use port from .env or default to 3000

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB Atlas:', error);
    });

// Basic routes
app.use('/', basicRoutes); // Mount basic routes at the root path

// User routes (protected)
app.use('/users', userRoutes); // Mount user routes at /users

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

