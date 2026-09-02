import Project from "../models/project.model.js";
import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";

const addMember = async (projectId, userId, role) => {
  const project = await Project.findById(projectId);

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const alreadyMember = project.members.some(
    (member) => member.user.toString() === userId,
  );

  if (alreadyMember) {
    throw new AppError("User is already a member of this project", 409);
  }

  project.members.push({
    user: userId,
    role: role || "member",
  });

  await project.save();

  return project;
};

const getMembers = async (projectId) => {
  const project = await Project.findById(projectId).populate(
    "members.user",
    "name email role",
  );

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  return project.members;
};

const removeMember = async (projectId, userId) => {
  const project = await Project.findById(projectId);

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  const memnerIndex = project.members.findIndex(
    (member) => member.user.toString() === userId,
  );

  if (memnerIndex === -1) {
    throw new AppError("User is not a member of this project", 404);
  }

  project.members.splice(memnerIndex, 1);

  await project.save();
};
export default {
  addMember,
  getMembers,
  removeMember,
};
