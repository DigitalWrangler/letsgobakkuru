const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
    cookie: {
        type: String,
        required: true
    },
    ip: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true // Consider making it required based on whether you always get a valid country or not
    },
    jwtToken: {
        type: String,
        required: true
    },
    visitCount: {
        type: Number,
        default: 1
    },
    firstVisit: {
        type: Date,
        default: Date.now
    },
    lastVisit: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Visit', visitSchema);
