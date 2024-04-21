const fs = require("fs");
const path = require("path");

// Change the path according to your project structure and script location
const basePath = path.join(__dirname, "..", "src", "routes");

console.log("Current script location:", __dirname);
console.log("Looking for routes in:", basePath);

// Check if the directory exists
if (!fs.existsSync(basePath)) {
  console.error(`The directory ${basePath} does not exist.`);
  process.exit(1); // Exit the script if the directory does not exist
}

try {
  // Read all files in the directory
  const files = fs.readdirSync(basePath);
  console.log(`Found ${files.length} files in ${basePath}:`);

  // Process each file
  files.forEach((file) => {
    console.log("Processing file:", file);
    // Here you can add more file processing logic as needed
    // For example, reading and parsing the file content if they are JavaScript route definitions
  });
} catch (error) {
  // Handle errors that might occur during directory reading
  console.error("Error reading files:", error);
}
