const express = require("express");
const router = express.Router();

// Import all route handlers
const collectionRoute = require('./collectionRoute');
const projectRoute = require("./projectRoute");
const loginRoute = require("./loginRoute");
const recordRoute = require("./recordRoute");
const dashboardRoute = require("./dashboardRoute");
const eventRoute = require("./eventRoute");
const mailRoute = require("./mailRoute");
const viewRoute = require("./viewRoute");


// Mount the route handlers
router.use("/collections", collectionRoute);
router.use("/projects", projectRoute);
router.use("/login", loginRoute);
router.use("/records", recordRoute);
router.use("/dashboard", dashboardRoute);
router.use("/events", eventRoute);
router.use("/mail", mailRoute);
router.use ("/view", viewRoute);

module.exports = router;
