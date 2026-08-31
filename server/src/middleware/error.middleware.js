const errorHandler = (error, req, res, next) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || "Internal Server Error";

  if (error.name === "CastError") {
    statusCode = 400;
    message = "Invalid project ID";
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandler;
