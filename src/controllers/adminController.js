const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Admin = require("../models/UserAdmin"); // Adjust the path as necessary

// Route to create an admin user
router.post("/admin/create", async (req, res) => {
  try {
    // Prompt the user for each required field
    let username = await prompt("Enter username: ");
    let email = await prompt("Enter email: ");
    let password = await promptPassword("Enter password: ");
    let confirmPassword = await promptPassword("Confirm password: ");

    // Validate passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the admin user
    const admin = await Admin.create({
      username,
      email,
      password: hashedPassword,
      accountCreated: new Date(),
      lastOnline: new Date(),
    });

    res.status(201).json(admin);
  } catch (error) {
    console.error("Error creating admin:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Function to prompt for input
function prompt(question) {
  return new Promise((resolve, reject) => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    readline.question(question, (answer) => {
      readline.close();
      resolve(answer);
    });
  });
}

// Function to prompt for password input (without echoing)
function promptPassword(question) {
  return new Promise((resolve, reject) => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    readline.question(question, { hideEchoBack: true }, (password) => {
      readline.close();
      resolve(password);
    });
  });
}

module.exports = router;
