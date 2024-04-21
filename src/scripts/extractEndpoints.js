const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;

// Correct the base path to point to the routes directory accurately
const basePath = path.join(__dirname, "..", "routes");

// First, check if the directory actually exists to avoid the ENOENT error
if (!fs.existsSync(basePath)) {
  console.error(`The directory ${basePath} does not exist.`);
  process.exit(1); // Stop the process if the directory is not found
}

const files = fs.readdirSync(basePath);

const endpoints = [];

files.forEach((file) => {
  const filePath = path.join(basePath, file);
  const code = fs.readFileSync(filePath, "utf-8");

  const ast = parser.parse(code, {
    sourceType: "module",
    plugins: ["jsx", "classProperties", "dynamicImport"], // Add more plugins as needed
  });

  traverse(ast, {
    enter(path) {
      if (
        path.node.type === "CallExpression" &&
        path.node.callee.property &&
        ["get", "post", "put", "delete"].includes(
          path.node.callee.property.name,
        )
      ) {
        endpoints.push({
          method: path.node.callee.property.name.toUpperCase(),
          path: path.node.arguments[0].value,
          file: file,
        });
      }
    },
  });
});

console.log(endpoints);
