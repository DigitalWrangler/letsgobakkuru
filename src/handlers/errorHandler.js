function errorHandler(err, req, res, next) {
  console.error("Unhandled error:", err);
  let statusCode = 500;
  let errorMessage = "Internal Server Error";
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    // SyntaxError from JSON parsing
    statusCode = 400;
    errorMessage = "Invalid JSON format";
  } else if (err.name === "ValidationError") {
    // Mongoose validation error
    statusCode = 400;
    errorMessage = err.message;
  }

  // Send the error response
  res.status(statusCode).send(errorMessage);
}

module.exports = errorHandler;
