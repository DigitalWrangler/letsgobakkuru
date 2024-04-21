const express = require("express");
const router = express.Router();
const MailMade = require("../models/Mailmade");
const MailSent = require("../models/Mailsent");

// Route to create a new mail
router.post("/", async (req, res) => {
  try {
    const { sender, subject, content } = req.body;

    // Create a new mail document
    const newMail = new MailMade({
      sender,
      subject,
      content,
    });

    // Save the new mail document to the database
    const savedMail = await newMail.save();

    res.status(201).json(savedMail);
  } catch (error) {
    console.error("Error creating mail:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to get all mails
router.get("/", async (req, res) => {
  try {
    // Fetch all mail documents from the database
    const mails = await MailMade.find();

    res.json(mails);
  } catch (error) {
    console.error("Error fetching mails:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to create a new sent mail
router.post("/sent", async (req, res) => {
  try {
    const { recipient, subject, content } = req.body;

    // Create a new sent mail document
    const newSentMail = new MailSent({
      recipient,
      subject,
      content,
    });

    // Save the new sent mail document to the database
    const savedSentMail = await newSentMail.save();

    res.status(201).json(savedSentMail);
  } catch (error) {
    console.error("Error creating sent mail:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to get all sent mails
router.get("/sent", async (req, res) => {
  try {
    // Fetch all sent mail documents from the database
    const sentMails = await MailSent.find();

    res.json(sentMails);
  } catch (error) {
    console.error("Error fetching sent mails:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
