const mongoose = require('mongoose');

const botSchema = new mongoose.Schema({
    botType: {
        type: String,
        required: true
    },
    botMission: {
        type: String,
        required: true
    },
    missionsDone: {
        type: Number,
        default: 0
    },
    firstMissionDate: {
        type: Date,
        default: Date.now  // Automatically set if not provided
    },
    latestMissionDate: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true }); // createdAt and updatedAt are managed by Mongoose

const Bot = mongoose.model('Bot', botSchema);
module.exports = Bot;
