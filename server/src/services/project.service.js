import Project from "../models/project.model.js";
import AppError from "../utils/AppError.js";

const createProject = async (projectData) => {
  const project = await Project.create(projectData);

  return project;
};
const getProjects = async (page, limit, status, priority, sort, order) => {
  const skip = (page - 1) * limit;

  const filter = {};

  if (status) {
    filter.status = status;
  }

  if (priority) {
    filter.priority = priority;
  }

  const sortOptions = {};

  if (sort) {
    sortOptions[sort] = order === "asc" ? 1 : -1;
  }

  const projects = await Project.find(filter)
    .populate("createdBy", "name email role")
    .sort(sortOptions)
    .skip(skip)
    .limit(limit);

  const totalProjects = await Project.countDocuments(filter);

  const totalPages = Math.ceil(totalProjects / limit);

  return {
    projects,
    pagination: {
      page,
      limit,
      totalProjects,
      totalPages,
    },
  };
};
const getProjectById = async (id) => {
  const project = await Project.findById(id).populate(
    "createdBy",
    "name email role",
  );

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  return project;
};

const updateProjectById = async (id, updateData) => {
  const project = await Project.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  return project;
};

const deleteProjectById = async (id) => {
  const project = await Project.findByIdAndDelete(id);

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  return project;
};

export default {
  createProject,
  getProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById,
};
