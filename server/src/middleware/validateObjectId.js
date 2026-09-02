import mongoose from "mongoose";
import AppError from "../utils/AppError.js";

const validateObjectId = (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError("Invalid task ID", 400);
  }

  next();
};

export default validateObjectId;
