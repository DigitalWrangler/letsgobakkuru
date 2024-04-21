const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    resume: {
        type: Number,
        required: true,
        unique: true, // Assuming 'resume' is intended as a unique identifier you will manually increment
        index: true
    },
    version: {
        type: Number,
        default: 1
    },
    method: {
        type: String,
        enum: ['website', 'mailbot'],
        required: true
    },
    totalCV: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    last_time: {
        type: Date,
        default: Date.now
    }
}, { timestamps: { createdAt: 'timestamp', updatedAt: 'last_time' } }); // Use 'timestamp' and 'last_time' as the field names for creation and update times

const ResumesOUT = mongoose.model('ResumesOUT', resumeSchema);

module.exports = ResumesOUT;
