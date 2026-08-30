import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("TeamFLow API is Running");
});

export default app;
