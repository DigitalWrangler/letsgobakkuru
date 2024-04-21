const mongoose = require("mongoose");

const projectCountSchema = new mongoose.Schema({
  id: Number,
  name: String,
  label: String,
  tags: [String],
  posted: Date,
  project_count: Number,
  imageUrls: [String], // Field for storing multiple image URLs
});

const ProjectCount = mongoose.model("ProjectCount", projectCountSchema);
module.exports = ProjectCount;
