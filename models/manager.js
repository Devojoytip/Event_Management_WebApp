const mongoose = require('mongoose');

const managerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    manager_phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    manager_name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Manager = new mongoose.model('Manager', managerSchema);

module.exports = Manager;