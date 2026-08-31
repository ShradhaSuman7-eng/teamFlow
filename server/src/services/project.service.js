import Project from "../models/project.model.js";

const createProject = async (projectData) => {
  const project = await Project.create(projectData);

  return project;
};

const getProjects = async () => {
  const projects = await Project.find();

  return projects;
};

export default {
  createProject,
  getProjects,
};
