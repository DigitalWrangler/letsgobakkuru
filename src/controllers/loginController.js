const bcrypt = require("bcrypt");
const Admin = require("../models/UserAdmin");
const pool = require('../../dbConnect/connect');

// Setup logging with Winston
const logger = require("winston").createLogger({
  level: "error", // Set the logging level as needed
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.File({ filename: "error.log" }),
    new winston.transports.Console(),
  ],
});

async function authenticateUser(username, password) {
  try {
    // Find admin by username in the database
    const admin = await Admin.findOne({ username: username });
    if (admin) {
      // Compare the provided password with the hashed password stored in the database
      const passwordMatch = await bcrypt.compare(password, admin.password);
      if (passwordMatch) {
        logger.info(`User ${username} authenticated successfully`);
        return {
          success: true,
          message: "Authentication successful",
          admin: admin,
        };
      } else {
        logger.warn(`Failed login attempt for ${username}`);
        return { success: false, message: "Invalid username or password" };
      }
    } else {
      logger.warn(`Login attempt for non-existent user ${username}`);
      return { success: false, message: "Admin not found" };
    }
  } catch (error) {
    logger.error("Error during login:", error);
    return { success: false, message: "Error during login" };
  }
}

module.exports = authenticateUser;
