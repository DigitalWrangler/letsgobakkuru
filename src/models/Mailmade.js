const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid"); // Import UUID generator

const mailMadeSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4, // Use UUID as default value
  },
  sender: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const MailMade = mongoose.model("MailMade", mailMadeSchema);

module.exports = MailMade;
