import Task from "../models/task.model.js";
import AppError from "../utils/AppError.js";

const taskOwnerMiddleware = async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  console.log("REQ USER:", req.user.userId);
  console.log("TASK OWNER:", task.createdBy.toString());

  if (task.createdBy.toString() !== req.user.userId.toString()) {
    throw new AppError("You are not allowed to modify this task", 403);
  }

  next();
};

export default taskOwnerMiddleware;
