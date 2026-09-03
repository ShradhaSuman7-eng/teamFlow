import AppError from "../utils/AppError.js";

const validateMemberRole = (req, res, next) => {
  const { role } = req.body;

  if (!role) {
    throw new AppError("Role is required", 400);
  }

  if (!["manager", "member"].includes(role)) {
    throw new AppError("Invalid role. Allowed roles: manager, member", 400);
  }

  next();
};

export default validateMemberRole;
