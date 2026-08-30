import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("TeamFLow API is Running");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log("Server is Running");
});
