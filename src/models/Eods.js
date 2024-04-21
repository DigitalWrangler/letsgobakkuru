const mongoose = require('mongoose');

const dailyStatsSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  operationDay: Number,
  totalVisits: Number,
  uniqueVisitors: Number,
  totalLogins: Number,
  botsInteractions: Number,
  botMissionsCompleted: Number,
  resumesPosted: Number,
  newCountries: [{ type: String }],
  countryStatistics: [{
    countryName: String,
    totalViews: Number,
    uniqueVisits: Number,
    lastVisit: Date
  }]
});

const DailyStats = mongoose.model('DailyStats', dailyStatsSchema);

module.exports = DailyStats;
