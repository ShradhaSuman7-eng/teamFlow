import mongoose from "mongoose";
import AppError from "../utils/AppError.js";

const validateTask = (req, res, next) => {
  const { title, project, assignedTo, priority, status } = req.body;

  // Validate title
  if (!title || !title.trim()) {
    throw new AppError("Task title is required", 400);
  }

  // Validate project
  if (!project) {
    throw new AppError("Project ID is required", 400);
  }

  if (!mongoose.Types.ObjectId.isValid(project)) {
    throw new AppError("Invalid project ID", 400);
  }

  // Validate assigned user
  if (assignedTo && !mongoose.Types.ObjectId.isValid(assignedTo)) {
    throw new AppError("Invalid assigned user ID", 400);
  }

  // Validate priority
  if (priority && !["low", "medium", "high"].includes(priority)) {
    throw new AppError("Invalid priority", 400);
  }

  // Validate status
  if (status && !["todo", "in-progress", "completed"].includes(status)) {
    throw new AppError("Invalid status", 400);
  }

  next();
};

export default validateTask;
