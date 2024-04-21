const moment = require('moment');
const axios = require('axios'); // Axios for HTTP requests

// Simulated data functions
async function fetchTotalMissions() {
    return 150; // Simulate fetching data
}

async function fetchTotalResumes() {
    return 200; // Simulate fetching data
}

async function daysSinceDate(targetDate) {
    const date = moment(targetDate, "YYYY-MM-DD");
    return moment().diff(date, 'days');
}

class StatsToday {
    static async fetchStats() {
        const totalMissions = await fetchTotalMissions();
        const totalResumes = await fetchTotalResumes();
        const daysSinceLaunch = await daysSinceDate('2024-04-15');

        const stats = {
            totalMissions,
            totalResumes,
            daysSinceLaunch
        };

        await StatsToday.postStats(stats);
        return stats;
    }

    static async postStats(stats) {
        // Here you can define where and how to post these stats
        // Example: Post to an internal API or save it to a database
        try {
            const response = await axios.post('http://localhost:3000/api/stats', stats);
            console.log('Stats posted:', response.data);
        } catch (error) {
            console.error('Error posting stats:', error);
        }
    }
}

module.exports = StatsToday;
