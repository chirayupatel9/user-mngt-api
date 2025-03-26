const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyAdmin } = require('../middleware/authMiddleware');

// Protect all user routes
router.use(verifyAdmin);

// Get all users
router.get('/', userController.getAllUsers);

// Register a new user
router.post('/', userController.registerUser);

// Update a user by ID
router.put('/:id', userController.updateUserById);

// Delete a user by ID
router.delete('/:id', userController.deleteUserById);

// Get a user by ID
router.get('/:id', userController.getUserById);

// Get a user by email
router.get('/:email', userController.getUserByEmail);

// Login user
router.post('/login', userController.loginUser);

module.exports = router;