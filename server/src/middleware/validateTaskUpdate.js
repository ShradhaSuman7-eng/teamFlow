import mongoose from "mongoose";
import AppError from "../utils/AppError.js";

const validateTaskUpdate = (req, res, next) => {
  const { title, description, project, assignedTo, priority, status, dueDate } =
    req.body;

  // Prevent empty update body
  if (Object.keys(req.body).length === 0) {
    throw new AppError("At least one field is required for update", 400);
  }

  // Allow only supported fields
  const allowedFields = [
    "title",
    "description",
    "project",
    "assignedTo",
    "priority",
    "status",
    "dueDate",
  ];

  const invalidFields = Object.keys(req.body).filter(
    (field) => !allowedFields.includes(field),
  );

  if (invalidFields.length > 0) {
    throw new AppError(
      `Invalid update fields: ${invalidFields.join(", ")}`,
      400,
    );
  }

  // Validate title
  if (title !== undefined) {
    if (typeof title !== "string" || !title.trim()) {
      throw new AppError("Task title cannot be empty", 400);
    }

    if (title.trim().length < 3) {
      throw new AppError("Task title must be at least 3 characters", 400);
    }

    if (title.trim().length > 100) {
      throw new AppError("Task title cannot exceed 100 characters", 400);
    }
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

  // Validate due date
  if (dueDate !== undefined) {
    if (isNaN(Date.parse(dueDate))) {
      throw new AppError("Invalid due date", 400);
    }
  }

  next();
};
export default validateTaskUpdate;
