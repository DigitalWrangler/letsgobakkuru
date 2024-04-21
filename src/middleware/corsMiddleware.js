require('dotenv').config();
const cors = require('cors');

const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*', // Use environment variable or fallback to '*'
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed request headers
};

app.use(cors(corsOptions));
