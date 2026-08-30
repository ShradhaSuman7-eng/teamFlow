const healthCheck = (req, res) => {
  res.status(200).json({
    success: true,
    message: "TeamFlow API is healthy",
  });
};

export default healthCheck;
