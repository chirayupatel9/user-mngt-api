const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Admin login route
router.post('/admin/login', adminController.adminLogin);

// Register a new admin
router.post('/admin/register', adminController.registerAdmin);

// Delete an admin by ID
router.delete('/admin/:id', adminController.deleteAdmin);

// Edit an admin by ID
router.put('/admin/:id', adminController.editAdmin);

// Get all admins
router.get('/admin', adminController.getAllAdmins);

// Get an admin by ID
router.get('/admin/:id', adminController.getAdminById);

module.exports = router;