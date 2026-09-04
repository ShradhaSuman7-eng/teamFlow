import mongoose from "mongoose";
import AppError from "../utils/AppError.js";

const validateTaskQuery = (req, res, next) => {
  const { sortBy, order, status, priority, project } = req.query;

  const allowedSortFields = [
    "createdAt",
    "updatedAt",
    "dueDate",
    "title",
    "priority",
    "status",
  ];

  const allowedStatuses = ["todo", "in-progress", "completed"];
  const allowedPriorities = ["low", "medium", "high"];

  // Validate sort field
  if (sortBy && !allowedSortFields.includes(sortBy)) {
    throw new AppError(
      `Invalid sort field. Allowed fields: ${allowedSortFields.join(", ")}`,
      400,
    );
  }

  // Validate status
  if (status && !allowedStatuses.includes(status)) {
    throw new AppError(
      `Invalid status. Allowed values: ${allowedStatuses.join(", ")}`,
      400,
    );
  }

  // Validate priority
  if (priority && !allowedPriorities.includes(priority)) {
    throw new AppError(
      `Invalid priority. Allowed values: ${allowedPriorities.join(", ")}`,
      400,
    );
  }

  // Validate project ID
  if (project && !mongoose.Types.ObjectId.isValid(project)) {
    throw new AppError("Invalid project ID", 400);
  }

  // Validate sort order
  if (order && !["asc", "desc"].includes(order)) {
    throw new AppError("Invalid sort order. Use 'asc' or 'desc'", 400);
  }

  // Validate page
  if (req.query.page !== undefined) {
    const page = Number(req.query.page);

    if (!Number.isInteger(page) || page < 1) {
      throw new AppError("Page must be a positive integer", 400);
    }
  }

  // Validate limit
  if (req.query.limit !== undefined) {
    const limit = Number(req.query.limit);

    if (!Number.isInteger(limit) || limit < 1) {
      throw new AppError("Limit must be a positive integer", 400);
    }

    if (limit > 100) {
      throw new AppError("Limit cannot exceed 100", 400);
    }
  }

  next();
};

export default validateTaskQuery;
