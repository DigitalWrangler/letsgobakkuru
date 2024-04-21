const jwt = require("jsonwebtoken");
const logger = require("/home/psyduck1337/Documents/gitNstuff/portfolio/portfolio-backend/src/loggers/logger.js");

// Middleware function to check if user is authenticated
// Middleware function to check if user is authenticated
function authenticate(req, res, next) {
  // Extract the JWT token from the request cookies
  const token = req.cookies.authToken;

  // If token is not present, user is not authenticated
  if (!token) {
    return res.status(401).send();
  }

  // If token is present, consider the user authenticated
  next();
}

module.exports = authenticate;
