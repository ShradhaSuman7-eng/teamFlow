import Project from "../models/project.model.js";
import AppError from "../utils/AppError.js";

const createProject = async (projectData) => {
  const project = await Project.create(projectData);

  return project;
};

const getProjects = async () => {
  const projects = await Project.find();

  return projects;
};

const getProjectById = async (id) => {
  const project = await Project.findById(id);

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
