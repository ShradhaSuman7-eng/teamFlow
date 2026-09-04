import mongoose from "mongoose";
import AppError from "../utils/AppError.js";

const validateTask = (req, res, next) => {
  const { title, description, project, assignedTo, priority, status, dueDate } =
    req.body;

  // Validate title
  if (!title || typeof title !== "string" || !title.trim()) {
    throw new AppError("Task title is required", 400);
  }

  if (title.trim().length < 3) {
    throw new AppError("Task title must be at least 3 characters", 400);
  }

  if (title.trim().length > 100) {
    throw new AppError("Task title cannot exceed 100 characters", 400);
  }

  // Validate description
  if (description !== undefined) {
    if (typeof description !== "string") {
      throw new AppError("Task description must be a string", 400);
    }

    if (description.trim().length > 500) {
      throw new AppError("Task description cannot exceed 500 characters", 400);
    }
  }

  // Validate project
  if (!project) {
    throw new AppError("Project ID is required", 400);
  }

  if (!mongoose.Types.ObjectId.isValid(project)) {
    throw new AppError("Invalid project ID", 400);
  }

  // Validate assigned user
  if (assignedTo !== undefined && assignedTo !== null) {
    if (!mongoose.Types.ObjectId.isValid(assignedTo)) {
      throw new AppError("Invalid assigned user ID", 400);
    }
  }

  // Validate priority
  if (priority !== undefined && !["low", "medium", "high"].includes(priority)) {
    throw new AppError("Invalid priority", 400);
  }

  // Validate status
  if (
    status !== undefined &&
    !["todo", "in-progress", "completed"].includes(status)
  ) {
    throw new AppError("Invalid status", 400);
  }

  // Validate due date
  if (dueDate !== undefined) {
    if (isNaN(Date.parse(dueDate))) {
      throw new AppError("Invalid due date", 400);
    }
  }

  next();
};

export default validateTask;
