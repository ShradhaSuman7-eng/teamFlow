import Project from "../models/project.model.js";
import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";
import Task from "../models/task.model.js";

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

  // Owner cannot be removed as a member
  if (project.createdBy.toString() === userId.toString()) {
    throw new AppError("Project owner cannot be removed", 400);
  }

  // Find member
  const memberIndex = project.members.findIndex(
    (member) => member.user.toString() === userId.toString(),
  );

  if (memberIndex === -1) {
    throw new AppError("User is not a member of this project", 404);
  }

  // Check assigned tasks
  const assignedTasksCount = await Task.countDocuments({
    project: projectId,
    assignedTo: userId,
  });

  if (assignedTasksCount > 0) {
    throw new AppError(
      `Cannot remove member. User has ${assignedTasksCount} assigned task(s). Reassign the tasks first.`,
      409,
    );
  }

  // Remove member
  project.members.splice(memberIndex, 1);

  await project.save();

  return project;
};

const updateMemberRole = async (projectId, userId, role) => {
  const project = await Project.findById(projectId);

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  // Owner's role cannot be changed
  if (project.createdBy.toString() === userId.toString()) {
    throw new AppError("Project owner role cannot be changed", 400);
  }

  // Find the member
  const member = project.members.find(
    (member) => member.user.toString() === userId.toString(),
  );

  if (!member) {
    throw new AppError("User is not a member of this project", 404);
  }

  // Update role
  member.role = role;

  await project.save();

  return project;
};
export default {
  addMember,
  getMembers,
  removeMember,
  updateMemberRole,
};
