import Task from "../models/task.model.js";
import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";

const createTask = async (taskData) => {
  const { assignedTo } = taskData;

  if (assignedTo) {
    const user = await User.findById(assignedTo);

    if (!user) {
      throw new AppError("Assigned user not found", 404);
    }
  }

  const task = await Task.create(taskData);

  return task;
};

const getTasks = async () => {
  const tasks = await Task.find()
    .populate("project", "name description status priority")
    .populate("createdBy", "name email role")
    .populate("assignedTo", "name email role");

  return tasks;
};

const getTaskById = async (id) => {
  const task = await Task.findById(id)
    .populate("project", "name description status priority")
    .populate("createdBy", "name email role")
    .populate("assignedTo", "name email role");

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  return task;
};

const updateTaskById = async (id, updatedData) => {
  const task = await Task.findByIdAndUpdate(id, updatedData, {
    returnDocument: "after",
    runValidators: true,
  })
    .populate("project", "name description status priority")
    .populate("createdBy", "name email role")
    .populate("assignedTo", "name email role");

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  return task;
};

const deleteTaskById = async (id) => {
  const task = await Task.findByIdAndDelete(id);

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  return task;
};

export default {
  createTask,
  getTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
};
