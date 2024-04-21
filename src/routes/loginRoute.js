const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Admin = require("../models/UserAdmin");
const path = require("path");

// Define xhtmlPath constant
const xhtmlPath = path.join(__dirname, "../public/screens/login/login.xhtml");

router.get("/", (_req, res) => {
  res.sendFile(xhtmlPath);
});

router.post("/", async (req, res) => {
  const { username, password } = req.body;// Authentication route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const authResult = await authenticateUser(username, password);
    if (authResult.success) {
      const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
      res.json({ token });
    } else {
      res.status(401).json({ error: authResult.message });
    }
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

async function authenticateUser(username, password) {
  try {
    const admin = await Admin.findOne({ username });
    if (admin) {
      const passwordMatch = await bcrypt.compare(password, admin.password);
      if (passwordMatch) {
        return { success: true, message: "Authentication successful" };
      } else {
        return { success: false, message: "Invalid username or password" };
      }
    } else {
      return { success: false, message: "Admin not found" };
    }
  } catch (error) {
    console.error("Error during login:", error);
    return { success: false, message: "Error during login" };
  } 
}

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
