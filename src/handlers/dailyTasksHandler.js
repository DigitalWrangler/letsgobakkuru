const { updateCountryStats } = require('../controllers/');

function dailyTask() {
  console.log("Performing daily update...");
  updateCountryStats();
}

module.exports = { dailyTask };
