import AppError from "../utils/AppError.js";

const validateProjectUpdate = (req, res, next) => {
  const { name, description, status, priority } = req.body;

  // Check that at least one field is provided
  if (
    name === undefined &&
    description === undefined &&
    status === undefined &&
    priority === undefined
  ) {
    throw new AppError(
      "At least one project field is required for update",
      400,
    );
  }

  // Validate name
  if (name !== undefined) {
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
  }

  // Validate description
  if (description !== undefined) {
    if (typeof description !== "string") {
      throw new AppError("Project description must be a string", 400);
    }

    if (description.trim().length > 500) {
      throw new AppError(
        "Project description cannot exceed 500 characters",
        400,
      );
    }
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

export default validateProjectUpdate;
