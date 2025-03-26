const Admin = require('../models/adminModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Admin login
exports.adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        console.log(admin);

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        console.log(isMatch);

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
        console.log(token);

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

// Register a new admin
exports.registerAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Username already in use' });
        }

        const newAdmin = new Admin({ username, password });
        await newAdmin.save();

        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering admin', error });
    }
};

// Delete an admin by ID
exports.deleteAdmin = async (req, res) => {
    try {
        const adminId = req.params.id;

        const deletedAdmin = await Admin.findByIdAndDelete(adminId);
        if (!deletedAdmin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting admin', error });
    }
};

// Edit an admin by ID
exports.editAdmin = async (req, res) => {
    try {
        const adminId = req.params.id;
        const { username, password } = req.body;

        const updatedData = { username };
        if (password) {
            const saltRounds = 10;
            updatedData.password = await bcrypt.hash(password, saltRounds);
        }

        const updatedAdmin = await Admin.findByIdAndUpdate(adminId, updatedData, { new: true });
        if (!updatedAdmin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        res.status(200).json({ message: 'Admin updated successfully', updatedAdmin });
    } catch (error) {
        res.status(500).json({ message: 'Error updating admin', error });
    }
};

// Get all admins
exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find(); // Fetch all admins from the database
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching admins', error });
    }
};

// Get an admin by ID
exports.getAdminById = async (req, res) => {
    try {
        const adminId = req.params.id;

        const admin = await Admin.findById(adminId); // Fetch admin by ID
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching admin', error });
    }
};