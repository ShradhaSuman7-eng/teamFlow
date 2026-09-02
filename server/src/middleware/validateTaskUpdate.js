import mongoose from "mongoose";
import AppError from "../utils/AppError.js";

const validateTaskUpdate = (req, res, next) => {
  const { title, project, assignedTo, priority, status, dueDate } = req.body;

  // Prevent empty update body
  if (Object.keys(req.body).length === 0) {
    throw new AppError("At least one field is required for update", 400);
  }

  // Validate title
  if (title !== undefined) {
    if (typeof title !== "string" || !title.trim()) {
      throw new AppError("Task title cannot be empty", 400);
    }
  }

  // Validate project
  if (project !== undefined) {
    if (!mongoose.Types.ObjectId.isValid(project)) {
      throw new AppError("Invalid project ID", 400);
    }
  }

  // Validate assignedTo
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

  // Validate dueDate
  if (dueDate !== undefined) {
    if (isNaN(Date.parse(dueDate))) {
      throw new AppError("Invalid due date", 400);
    }
  }

  next();
};

export default validateTaskUpdate;
