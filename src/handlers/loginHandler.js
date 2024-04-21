const bcrypt = require("bcrypt");
const Admin = require("../models/UserAdmin");
const jwt = require("jsonwebtoken");
const logger = require("/home/psyduck1337/Documents/gitNstuff/portfolio/portfolio-backend/src/loggers/logger.js");
const path = require("path"); // Import the 'path' module

function setupLoginRoutes(app) {
  const basePath =
    "/home/psyduck1337/Documents/gitNstuff/portfolio/portfolio-backend/src/public/screens/";

  app.get("/login", (req, res) => {
    const loginPath = path.join(basePath, "login/login.xhtml");
    res.sendFile(loginPath);
  });

  app.get("/dashboard", (req, res) => {
    if (req.session && req.session.user) {
      const dashboardPath = path.join(basePath, "dashboard/dashboard.xhtml");
      res.sendFile(dashboardPath);
    } else {
      res.status(401).send("Unauthorized: No session available");
    }
  });

  app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
      const admin = await Admin.findOne({ username });
      if (admin && bcrypt.compareSync(password, admin.password)) {
        req.session.user = { id: admin._id, username: admin.username };
        const token = jwt.sign(
          { id: admin._id, username: admin.username },
          "", // Remove the JWT secret token
        );

        // Send the token to the client
        res.cookie("jwt", token, { httpOnly: true, secure: "auto" }); // Set secure to true if using HTTPS
        res
          .status(200)
          .json({ success: true, message: "Authentication successful", token });
      } else {
        logger.error("Invalid username or password");
        res.status(401).send("Invalid username or password");
      }
    } catch (error) {
      logger.error("Error during login:", error);
      res.status(500).send("Error during login");
    }
  });
}

module.exports = setupLoginRoutes;
