const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Admin = require("../models/UserAdmin");
const path = require("path");

const dashboardXhtmlPath = path.join(__dirname, "./dashboard/dashboard.xhtml");
router.get("/", (_req, res) => {
  res.sendFile(dashboardXhtmlPath);
});
router.post("/", async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, admin.password);

    // If passwords don't match, return an error
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    // If passwords match, return the admin details
    res.status(200).json({ admin });
  } catch (error) {
    console.error("Error during admin login:", error);
    res.status(500).json({ error: "Error during admin login" });
  }
});

module.exports = router;
