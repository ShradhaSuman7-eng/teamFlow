import "dotenv/config";
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("TeamFLow API is Running");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server is Running");
});
