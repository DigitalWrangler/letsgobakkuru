const fs = require("fs");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;

const routes = {
  "/login": "src/routes/loginRoute.js",
  "/dashboard": "src/routes/dashboardRoute.js",
  "/error": "src/routes/errorRoute.js",
  "/project": "src/routes/projectRoute.js",
  "/record": "src/routes/recordRoute.js",
  "/event": "src/routes/eventRoute.js",
  "/collection": "src/routes/collectionRoute.js",
};

const basePath =
  "/home/psyduck1337/Documents/gitNstuff/portfolio/portfolio-backend/";

let endpoints = [];

Object.keys(routes).forEach((routePath) => {
  const filePath = basePath + routes[routePath];
  const code = fs.readFileSync(filePath, "utf-8");
  const ast = parser.parse(code, {
    sourceType: "module",
    plugins: ["jsx", "classProperties", "dynamicImport"],
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
          path: routePath,
          file: routes[routePath],
          description: "Add a description here", // Placeholder for descriptions
        });
      }
    },
  });
});

const writeDocumentationToFile = (endpoints) => {
  let docContent = "# API Documentation\n\n";

  endpoints.forEach((ep) => {
    docContent += `## Endpoint: ${ep.path}\n`;
    docContent += `**Method**: ${ep.method}\n`;
    docContent += `**File**: ${ep.file}\n`;
    docContent += `**Description**: ${ep.description}\n\n`;
  });

  fs.writeFileSync("API_Documentation.md", docContent);
};

writeDocumentationToFile(endpoints);
