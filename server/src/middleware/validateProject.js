import AppError from "../utils/AppError.js";

const validateProject = (req, res, next) => {
  const { name, description, status, priority } = req.body;

  // Validate name
  if (!name) {
    throw new AppError("Project name is required", 400);
  }

  if (typeof name !== "string") {
    throw new AppError("Project name must be a string", 400);
  }

  if (name.trim().length === 0) {
    throw new AppError("Project name cannot be empty", 400);
  }

  if (name.trim().length < 3) {
    throw new AppError("Project name must be at least 3 characters", 400);
  }

  if (name.trim().length > 100) {
    throw new AppError("Project name cannot exceed 100 characters", 400);
  }

  // Validate description
  if (description !== undefined && typeof description !== "string") {
    throw new AppError("Project description must be a string", 400);
  }

  if (typeof description === "string" && description.trim().length > 500) {
    throw new AppError("Project description cannot exceed 500 characters", 400);
  }

  // Validate status
  if (status !== undefined) {
    const allowedStatuses = ["planning", "active", "completed", "archived"];

    if (!allowedStatuses.includes(status)) {
      throw new AppError(
        "Status must be planning, active, completed, or archived",
        400,
      );
    }
  }

  // Validate priority
  if (priority !== undefined) {
    const allowedPriorities = ["low", "medium", "high"];

    if (!allowedPriorities.includes(priority)) {
      throw new AppError("Priority must be low, medium, or high", 400);
    }
  }

  next();
};

export default validateProject;
