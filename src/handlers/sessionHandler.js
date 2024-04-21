const winston = require("winston");

// Setup logging
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "session.log" }),
  ],
});

/**
 * Sets up session management for an Express application.
 * @param {Express.Application} app - The Express application to which the session middleware will be applied.
 */
function setupSessionHandler(app) {
  // Remove session middleware setup
  logger.warn("Session handler setup removed. Sessions are no longer managed.");
}

module.exports = setupSessionHandler;
