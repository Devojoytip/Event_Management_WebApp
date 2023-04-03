const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    adminname: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Admin = new mongoose.model('Admin', adminSchema);

module.exports = Admin;