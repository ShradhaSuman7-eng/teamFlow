import mongoose from "mongoose";
import AppError from "../utils/AppError.js";

const validateTask = (req, res, next) => {
  const { title, project, priority, status } = req.body;

  if (!title || !title.trim()) {
    throw new AppError("Task title is required", 400);
  }

  if (!project) {
    throw new AppError("Project ID is required", 400);
  }

  console.log("PROJECT ID:", project);
  console.log("IS VALID:", mongoose.Types.ObjectId.isValid(project));

  if (!mongoose.Types.ObjectId.isValid(project)) {
    throw new AppError("Invalid project ID", 400);
  }

  if (priority && !["low", "medium", "high"].includes(priority)) {
    throw new AppError("Invalid priority", 400);
  }

  if (status && !["todo", "in-progress", "completed"].includes(status)) {
    throw new AppError("Invalid status", 400);
  }

  next();
};

export default validateTask;
