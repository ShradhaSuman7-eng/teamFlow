import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("TeamFLow API is Running");
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "TeamFlow API is healthy",
  });
});

export default app;
