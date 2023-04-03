const mongoose = require('mongoose');
const path = require('path');

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    eventname: {
        type: String,
        required: true
    },
    registered_date:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true
    },
    heardFrom: {
        type: String
    },
    content: {
        type: String,
        required: true
    },
    cost:{
        type:Number,
        required: true
    },
    status:{
        type:Boolean,
        required: true
    },
    manager:{
        type:String,
        required: true
    }
}, {
    timestamps: true
});

const Event = new mongoose.model('Event', eventSchema);

module.exports = Event;