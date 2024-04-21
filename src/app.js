require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const Visit = require('./models/Visit');
const Country = require('./models/Country');
const Bot = require('./models/Bots');
const ResumesOUT = require('./models/Resumes');
const DateModel = require('./models/Date');
const StatsToday = require('./models/SmallStats');

const app = express();
const port = process.env.PORT || 3000;

// Secure MongoDB connection with additional options
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.error('MongoDB connection error:', err));

// Configure CORS to accept specific origins from environment variables
const allowedOrigins = (process.env.CORS_ORIGIN || '').split(',');

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true); // Allow if origin is in the list or if there's no origin (server-to-server requests)
        }
        return callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions)); // Apply CORS with the updated options
app.use(express.json()); // Parse JSON body

function generateToken(data) {
    return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '180d' });
}

app.post('/increment-view-count', async (req, res) => {
    const { cookie, ip } = req.body;
    if (!cookie || !ip) {
        return res.status(400).json({ error: 'Cookie and IP are required in the request body' });
    }

    try {
        const apiResponse = await axios.get(`http://ip-api.com/json/${ip}`);
        const country = apiResponse.data.country;

        let visit = await Visit.findOne({ cookie: cookie });
        const token = generateToken({ cookie, ip });
        const currentTime = new Date();

        if (!visit) {
            visit = new Visit({ cookie, jwtToken: token, ip, country });
            await visit.save();
        } else {
            visit.lastVisit = currentTime;
            visit.jwtToken = token;
            await visit.save();
        }

        // Update or create the country count in the countries collection
        await Country.findOneAndUpdate(
            { countryName: country },
            {
                $inc: { totalVisits: 1 },
                $addToSet: { uniqueTokens: token },
                $set: { lastVisit: currentTime }
            },
            { upsert: true, new: true }
        );

        res.status(200).json({ message: 'Visit counted', token, visit });
    } catch (error) {
        console.error('Error handling visit or fetching country:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/country-statistics', async (req, res) => {
    try {
        const countries = await Country.find({});
        const result = countries.map(country => ({
            countryName: country.countryName,
            totalViews: country.totalVisits,
            uniqueVisits: country.uniqueTokens ? country.uniqueTokens.length : 0,  // Check if uniqueTokens is defined
            lastVisit: country.lastVisit
        }));
        res.json(result);
    } catch (error) {
        console.error('Error retrieving country statistics:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});



app.post('/update-country-stats', async (req, res) => {
    try {
        // Fetch current country stats from the '/country-stats' endpoint
        const response = await axios.get('http://localhost:3000/country-stats');
        const countryStats = response.data;

        // Process each country stat and update the 'countries' collection
        for (const stat of countryStats) {
            await Country.findOneAndUpdate(
                { countryName: stat.countryName },
                { $set: { visits: stat.visits } },
                { upsert: true, new: true }
            );
        }

        res.status(200).json({ message: 'Countries collection updated successfully' });
    } catch (error) {
        console.error('Error updating countries collection:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});
app.get('/data', async (req, res) => {
    try {
        const totalViewCount = await Visit.aggregate([
            { $group: { _id: null, total: { $sum: "$visitCount" } } }
        ]);

        res.json({ totalViewCount: totalViewCount.length ? totalViewCount[0].total : 0 });
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/my-visits', async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header is missing' });
    }

    const token = authHeader.split(' ')[1]; // Assuming the Authorization header contains 'Bearer <token>'
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const cookie = decoded.cookie;

        const visit = await Visit.findOne({ cookie: cookie, jwtToken: token });
        if (!visit) {
            return res.status(404).json({ error: 'No visit data found for this token' });
        }

        res.json({ success: true, message: 'Token is valid and the visit record has been updated.', visitCount: visit.visitCount });
    } catch (error) {
        console.error('Token error:', error);
        res.status(401).json({ error: 'Failed to authenticate token' });
    }
});

app.get('/user-visits/:id', async (req, res) => {
    try {
        const visit = await Visit.findById(req.params.id);
        if (visit) {
            res.json(visit);
        } else {
            res.status(404).json({ error: 'User data not found' });
        }
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.get('/validate-token', async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header is missing' });
    }

    const token = authHeader.split(' ')[1]; // Assuming the Authorization header contains 'Bearer <token>'
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        console.log("Verifying token:", token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded:", decoded);
        const cookie = decoded.cookie;

        // Use await to handle the promise returned by findOneAndUpdate
        const visit = await Visit.findOneAndUpdate(
            { cookie: cookie, jwtToken: token },
            { $inc: { visitCount: 1 }, $set: { lastVisit: new Date() } },
            { new: true } // Return the updated document
        );

        if (!visit) {
            return res.status(404).json({ error: 'No visit data found for this token' });
        }

        // If a visit is found and updated, the token is valid and the visit count has been incremented
        res.json({ success: true, message: 'Token is valid and the visit record has been updated.', visitCount: visit.visitCount });
    } catch (error) {
        console.error('Token error:', error);
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ error: 'Token has expired' });
        }
        res.status(401).json({ error: 'Failed to authenticate token' });
    }
});

app.post('/bots', async (req, res) => {
    const { botType, botMission } = req.body;

    if (!botType || !botMission) {
        return res.status(400).json({ message: 'Bot type and mission are required' });
    }

    try {
        const newBot = new Bot({
            botType: botType,
            botMission: botMission
        });

        const savedBot = await newBot.save();
        res.status(201).json(savedBot);
    } catch (error) {
        console.error('Error saving new bot:', error);
        res.status(500).json({ message: 'Failed to create new bot', error: error.message });
    }
});
app.get('/bots/missions', async (req, res) => {
    try {
        const totalMissions = await Bot.aggregate([
            {
                $group: {
                    _id: null, // Group all documents into one
                    totalMissionsDone: { $sum: "$missionsDone" }
                }
            }
        ]);

        if (totalMissions.length === 0) {
            return res.status(404).json({ message: "No bots found or no missions recorded." });
        }

        res.json({ totalMissionsDone: totalMissions[0].totalMissionsDone });
    } catch (error) {
        console.error('Error fetching total missions:', error);
        res.status(500).json({ message: 'Failed to retrieve total missions', error: error.message });
    }
});

app.post('/bots/update', async (req, res) => {
    const { id, botType, botMission, missionsDone } = req.body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid or missing bot ID" });
    }

    try {
        const updatedBot = await Bot.findByIdAndUpdate(
            id,
            { $set: { botType, botMission, missionsDone }},
            { new: true, runValidators: true }
        );

        if (!updatedBot) {
            return res.status(404).json({ message: "Bot not found with provided ID." });
        }

        res.json(updatedBot);
    } catch (error) {
        console.error('Error updating bot:', error);
        res.status(500).json({ message: 'Failed to update bot', error: error.message });
    }
});
app.post('/resumes', async (req, res) => {
    try {
        const newResume = new ResumesOUT(req.body);
        const savedResume = await newResume.save();
        res.status(201).json(savedResume);
    } catch (error) {
        console.error('Error creating resume:', error);
        res.status(500).json({ message: 'Failed to create resume', error: error.message });
    }
});
let cache = {};

app.get('/resumes', async (req, res) => {
    // Check if cache is still valid
    if (cache.totalResumes && cache.timestamp > Date.now() - 1000 * 60 * 5) { // cache for 5 minutes
        return res.json({ totalResumes: cache.totalResumes });
    }

    try {
        const totalResumes = await ResumesOUT.countDocuments({});
        cache = { totalResumes, timestamp: Date.now() }; // Update cache
        res.json({ totalResumes });
    } catch (error) {
        console.error('Error getting total number of resumes:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});


app.post('/resumes/update/:id', async (req, res) => {
    const updates = req.body;
    try {
        const resume = await ResumesOUT.findOneAndUpdate({ resume: req.params.id }, updates, { new: true });
        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }
        res.json(resume);
    } catch (error) {
        console.error('Error updating resume:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});
// Route to get today's date
app.get('/date', (req, res) => {
    res.send({ today: DateModel.today() });
});

// Route to get how many days ago from a specific date
app.get('/date/ago', (req, res) => {
    // For demonstration, let's say we're calculating days since April 15, 2024
    const dateModel = new DateModel('2024-04-15');
    const daysAgo = dateModel.daysSince();
    res.send({ daysSince: daysAgo + " days since April 15, 2024" });
});
app.get('/stats/today', async (req, res) => {
    try {
        const stats = await StatsToday.fetchStats();
        res.json(stats);
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});