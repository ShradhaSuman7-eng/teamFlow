import mongoose from "mongoose";
import AppError from "../utils/AppError.js";

const validateObjectId = (paramName = "id") => {
  return (req, res, next) => {
    const id = req.params[paramName];

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError(`Invalid ${paramName}`, 400);
    }

    next();
  };
};

export default validateObjectId;
