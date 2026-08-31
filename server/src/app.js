import express from "express";
import healthRoute from "./routes/health.routes.js";
import logger from "./middleware/logger.middleware.js";
import errorHandler from "./middleware/error.middleware.js";
import projectRoute from "./routes/project.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(logger);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("TeamFlow API is Running");
});

app.use("/api", healthRoute);
app.use("/api/projects", projectRoute);
app.use("/api/auth", authRoutes);

app.use(errorHandler);

export default app;
