// loggerHandler.js
const collectionLogger = require("../loggers/collectionLogger");

function loggerHandler(level, message, method, path, status) {
  const logMessage = {
    level,
    message,
    timestamp: new Date().toISOString(),
    method,
    path,
    status,
  };

  switch (level) {
    case "info":
      collectionLogger.info(logMessage);
      break;
    case "error":
      collectionLogger.error(logMessage);
      break;
    case "debug":
      collectionLogger.debug(logMessage);
      break;
    default:
      collectionLogger.info(logMessage);
  }
}

module.exports = loggerHandler;
