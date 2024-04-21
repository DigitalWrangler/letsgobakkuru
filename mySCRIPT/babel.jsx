const fs = require("fs");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;

const extractEndpoints = (code, filePath) => {
  const ast = parser.parse(code, {
    sourceType: "module",
    plugins: ["jsx", "classProperties", "dynamicImport"],
  });

  let endpoints = [];

  traverse(ast, {
    enter(path) {
      if (
        path.node.type === "CallExpression" &&
        path.node.callee.property &&
        ["get", "post", "put", "delete"].includes(
          path.node.callee.property.name,
        )
      ) {
        let endpoint = {
          method: path.node.callee.property.name.toUpperCase(),
          path: path.node.arguments[0].value,
          file: filePath,
          description: "Add a description here",
          requestExample: "Add request example here",
          responseExample: "Add response example here",
        };
        endpoints.push(endpoint);
      }
    },
  });

  return endpoints;
};

// Example usage
const routesCode = fs.readFileSync("/path/to/your/routes/file.js", "utf-8");
const endpoints = extractEndpoints(routesCode, "file.js");
console.log(endpoints);
