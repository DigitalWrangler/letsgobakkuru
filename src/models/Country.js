const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
    countryName: {
        type: String,
        required: true,
        unique: true
    },
    totalVisits: {
        type: Number,
        default: 0
    },
    totalCountryViews: {
        type: Number,
        default: 0
    },
    uniqueTokens: {
        type: [String],  // Array of strings to store unique tokens
        default: []
    },
    lastVisit: {
        type: Date,
        default: Date.now  // Automatically set to the current date
    }
}, { timestamps: true });

const Country = mongoose.model('Country', countrySchema);
module.exports = Country;
