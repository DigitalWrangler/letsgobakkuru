const axios = require('axios');
const winston = require('winston');

// Setup Winston for logging
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: 'logs/api_test_log.log' })
    ]
});

// Base URL for API requests
const BASE_URL = 'http://localhost:3000';

// Sleep function to delay between requests
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function testIncrementViewCount() {
    const url = `${BASE_URL}/increment-view-count`;
    const data = { cookie: "13-5511231231231klsafsdf21" };
    try {
        const response = await axios.post(url, data);
        logger.info('Increment View Count Response:', response.data);
    } catch (error) {
        logger.error('Error in Increment View Count:', error.message);
    }
}

async function testUserVisits() {
    const url = `${BASE_URL}/user-visits/3`;
    try {
        const response = await axios.get(url);
        logger.info('User Visits Response:', response.data);
    } catch (error) {
        logger.error('Error in User Visits:', error.message);
    }
}

async function testData() {
    const url = `${BASE_URL}/data`;
    try {
        const response = await axios.get(url);
        logger.info('Data Response:', response.data);
    } catch (error) {
        logger.error('Error in Data:', error.message);
    }
}

async function testLogin() {
    const url = `${BASE_URL}/login`;
    const data = { username: "psyduck", password: "verado275" };
    try {
        const response = await axios.post(url, data);
        logger.info('Login Response:', response.data);
    } catch (error) {
        logger.error('Error in Login:', error.message);
    }
}

async function testValidateToken() {
    const url = `${BASE_URL}/validate-token`;
    const headers = { Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb29raWUiOiIxMy01NTExMjMxMjMxMjMxa2xzYWZzZGYyMSIsImlhdCI6MTcxMzMyNTg3NiwiZXhwIjoxNzEzNDEyMjc2fQ.sRgn3vtkMAFK0KEJOCy0wtOoMgw9Er7ZF529QN7-fSc" };
    try {
        const response = await axios.get(url, { headers });
        logger.info('Validate Token Response:', response.data);
    } catch (error) {
        logger.error('Error in Validate Token:', error.message);
    }
}

async function testCountryStatistics() {
    const url = `${BASE_URL}/country-statistics`;
    try {
        const response = await axios.get(url);
        logger.info('Country Statistics Response:', response.data);
    } catch (error) {
        logger.error('Error in Country Statistics:', error.message);
    }
}

async function testBots() {
    const url = `${BASE_URL}/bots`;
    const data = { botType: "surveillance", botMission: "monitoring area" };
    try {
        const response = await axios.post(url, data);
        logger.info('Bots Response:', response.data);
    } catch (error) {
        logger.error('Error in Bots:', error.message);
    }
}

async function testUpdateBots() {
    const url = `${BASE_URL}/bots/update`;
    const data = {
        id: "661f63c0c8cf86aeeb5d030b",
        botType: "surveillance",
        botMission: "monitoring area",
        missionsDone: 1
    };
    try {
        const response = await axios.post(url, data);
        logger.info('Update Bots Response:', response.data);
    } catch (error) {
        logger.error('Error in Update Bots:', error.message);
    }
}

async function testResumes() {
    const url = `${BASE_URL}/resumes`;
    const data = {
        resume: 1,
        version: 1,
        method: "website",
        totalCV: "user@example.com",
        timestamp: "2023-01-01T00:00:00Z",
        last_time: "2023-01-01T00:00:00Z"
    };
    try {
        const response = await axios.post(url, data);
        logger.info('Post Resumes Response:', response.data);
    } catch (error) {
        logger.error('Error in Resumes:', error.message);
    }
}

// Run all tests sequentially with sleeps between them
async function runTests() {
    logger.info('Starting API tests');
    await testIncrementViewCount();
    await sleep(1000);
    await testUserVisits();
    await sleep(1000);
    await testData();
    await sleep(1000);
    await testLogin();
    await sleep(1000);
    await testValidateToken();
    await sleep(1000);
    await testCountryStatistics();
    await sleep(1000);
    await testBots();
    await sleep(1000);
    await testUpdateBots();
    await sleep(1000);
    await testResumes();
    logger.info('Finished API tests');
}

runTests();
