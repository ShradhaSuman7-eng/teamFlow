const errorHandler = (error, req, res, next) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || "Internal Server Error";

  // Invalid MongoDB ObjectId
  if (error.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID";
  }

  // Mongoose validation error
  if (error.name === "ValidationError") {
    statusCode = 400;
    message = error.message;
  }

  // MongoDB duplicate key error
  if (error.code === 11000) {
    statusCode = 409;
    message = "Duplicate value already exists";
  }

  // Unexpected server error
  if (statusCode === 500) {
    message = "Internal Server Error";
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandler;
