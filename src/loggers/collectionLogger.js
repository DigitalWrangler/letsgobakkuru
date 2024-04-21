// collectionLogger.js
const winston = require("winston");
const logger = require("./logger"); // Import the logger configuration

const collectionLogger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.File({ filename: "collection.log" }), // Specific file transport for collection logs
    ...logger.transports, // Include transports from the main logger configuration
  ],
});

module.exports = collectionLogger;
