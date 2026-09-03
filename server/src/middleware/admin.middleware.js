import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";

const adminMiddleware = async (req, res, next) => {
  const user = await User.findById(req.user.userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (user.role !== "admin") {
    throw new AppError("Admin access required", 403);
  }

  next();
};

export default adminMiddleware;
