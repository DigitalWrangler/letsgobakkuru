const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const path = require("path");
// Route to create event
router.post("/event/", async (req, res) => {
  try {
    await eventController.createEvent(req, res);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
