import mongoose from "mongoose";
import AppError from "../utils/AppError.js";

const validateProjectMember = (req, res, next) => {
  const { userId, role } = req.body;

  // Validate userId
  if (!userId) {
    throw new AppError("User ID is required", 400);
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new AppError("Invalid user ID", 400);
  }

  // Validate role
  if (role !== undefined && !["manager", "member"].includes(role)) {
    throw new AppError("Invalid role. Allowed roles: manager, member", 400);
  }

  next();
};

export default validateProjectMember;
