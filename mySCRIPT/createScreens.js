const fs = require("fs");
const path = require("path");

const screens = ["dashboard", "login", "projects", "user_visits", "collection"];

const srcDir = path.join(__dirname, "..", "src"); // Adjust the path to match your project structure
const screensDir = path.join(srcDir, "public", "screens");

if (!fs.existsSync(srcDir)) {
  fs.mkdirSync(srcDir, { recursive: true }); // Ensure that the src directory and any necessary subdirectories are created
}

if (!fs.existsSync(screensDir)) {
  fs.mkdirSync(screensDir, { recursive: true }); // Ensure that the screens directory and any necessary subdirectories are created
}

screens.forEach((screen) => {
  const screenDir = path.join(screensDir, screen);
  if (!fs.existsSync(screenDir)) {
    fs.mkdirSync(screenDir); // Create directory for the screen if it doesn't exist

    const screenXhtmlFilePath = path.join(screenDir, `${screen}.xhtml`);
    const screenScssFilePath = path.join(screenDir, `${screen}.scss`);

    const xhtmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${screen.charAt(0).toUpperCase() + screen.slice(1)}</title>
    <link rel="stylesheet" type="text/css" href="${screen}.css" />
</head>
<body>
    <h1>${screen.charAt(0).toUpperCase() + screen.slice(1)}</h1>
    <p>This is the ${screen} screen.</p>
    <script src="${screen}.js"></script>
</body>
</html>`;

    const scssContent = `/* SCSS for ${screen} screen */\n`;

    fs.writeFileSync(screenXhtmlFilePath, xhtmlContent);
    console.log(
      `XHTML file for '${screen}' created successfully at ${screenXhtmlFilePath}`,
    );

    fs.writeFileSync(screenScssFilePath, scssContent);
    console.log(
      `SCSS file for '${screen}' created successfully at ${screenScssFilePath}`,
    );
  } else {
    console.log(`Directory for screen '${screen}' already exists. Skipping...`);
  }
});

console.log("All screens and SCSS files created or skipped successfully!");
