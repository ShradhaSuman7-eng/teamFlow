import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";
import Project from "../models/project.model.js";

const getAllUsers = async () => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });

  return users;
};

const getUserById = async (userId) => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

const updateUserRole = async (userId, role) => {
  if (!["user", "admin"].includes(role)) {
    throw new AppError("Invalid role. Allowed roles: user, admin", 400);
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (user.role === role) {
    return user;
  }

  if (user.role === "admin" && role === "user") {
    const adminCount = await User.countDocuments({
      role: "admin",
    });

    if (adminCount === 1) {
      throw new AppError("Cannot remove the last admin", 400);
    }
  }

  user.role = role;

  await user.save();

  return user;
};

const getAllProjects = async () => {
  const projects = await Project.find()
    .populate("createdBy", "name email role")
    .populate("members.user", "name email role")
    .sort({ createdAt: -1 });

  return projects;
};

const getProjectById = async (projectId) => {
  const project = await Project.findById(projectId)
    .populate("createdBy", "name email role")
    .populate("members.user", "name email role");

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  return project;
};

export default {
  getAllUsers,
  getUserById,
  updateUserRole,
  getAllProjects,
  getProjectById,
};
