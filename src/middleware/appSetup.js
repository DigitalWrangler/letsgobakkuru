const { registerRoutes } = require('../../src/routes');

function appSetup(app) {
    // Setup all routes here
    registerRoutes(app);
}

module.exports = appSetup;
