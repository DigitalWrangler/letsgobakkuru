const bcrypt = require("bcrypt");
const Admin = require("../models/UserAdmin");
const path = require("path");
const logger = require("../loggers/logger");

function setupLoginRoutes(app) {
  app.get("/login", (req, res) => {
    const loginPath = path.join(
      __dirname,
      "../public/screens/login/login.xhtml",
    );
    res.sendFile(loginPath);
  });

  app.get("/dashboard", (req, res) => {
    if (req.session && req.session.user) {
      const dashboardPath = path.join(
        __dirname,
        "../public/screens/dashboard/dashboard.xhtml",
      );
      res.sendFile(dashboardPath);
    } else {
      res.status(401).send("Unauthorized: No session available");
    }
  });

  app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
      const admin = await Admin.findOne({ username });

      if (admin) {
        const passwordMatch = await bcrypt.compare(password, admin.password);
        if (passwordMatch) {
          req.session.user = { id: admin._id, username: admin.username }; // Store user info in session
          res.redirect("/dashboard");
        } else {
          logger.error("Invalid username or password");
          res.status(401).send("Invalid username or password");
        }
      } else {
        logger.error("Admin not found");
        res.status(404).send("Admin not found");
      }
    } catch (error) {
      logger.error("Error during login:", error);
      res.status(500).send("Error during login");
    }
  });
}

module.exports = setupLoginRoutes;
