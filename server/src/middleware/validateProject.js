import AppError from "../utils/AppError.js";

const validateProject = (req, res, next) => {
  const { name, priority } = req.body;

  if (!name) {
    return next(new AppError("Project name is required", 400));
  }

  if (typeof name !== "string") {
    return next(new AppError("Project name must be a string", 400));
  }

  if (name.trim().length === 0) {
    return next(new AppError("Project name cannot be empty", 400));
  }

  if (!priority) {
    return next(new AppError("Project priority is required", 400));
  }

  const allowedPriorities = ["low", "medium", "high"];

  if (!allowedPriorities.includes(priority)) {
    return next(new AppError("Priority must be low, medium, or high", 400));
  }

  next();
};

export default validateProject;
