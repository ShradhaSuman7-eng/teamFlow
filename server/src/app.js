import express from "express";
import healthRoute from "./routes/health.routes.js";

const app = express();

app.get("/", (req, res) => {
  res.send("TeamFlow API is Running");
});

app.use("/api", healthRoute);

export default app;
