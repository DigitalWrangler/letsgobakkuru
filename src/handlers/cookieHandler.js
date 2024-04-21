require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cookieParser());

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Route to handle user's acceptance of cookies
app.post("/accept-cookies", (req, res) => {
  const tokenData = { acceptedAt: new Date() }; // Data you want to encode in the JWT
  const token = jwt.sign(tokenData, JWT_SECRET, { expiresIn: "1y" }); // Expires in 1 year

  // Set the cookie with the JWT token
  res.cookie("authToken", token, { httpOnly: true, secure: true }); // secure: true - only serves on HTTPS
  res.status(200).send("Cookie set with JWT");
});
