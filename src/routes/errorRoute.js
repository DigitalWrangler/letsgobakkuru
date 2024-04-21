const express = require("express");
const router = express.Router();
const errorHandler = require("../handlers/errorHandler");

// Apply the error handling middleware to all routes
router.use(errorHandler);
module.exports = router;
