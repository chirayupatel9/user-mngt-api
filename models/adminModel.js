const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the Admin schema
const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Hash the password before saving
adminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
});

// Create the Admin model
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;