import projectService from "../services/project.service.js";

const createProject = async (req, res) => {
  const project = await projectService.createProject(req.body);

  res.status(201).json({
    success: true,
    message: "Project created successfully",
    data: project,
  });
};

const getProjects = async (req, res) => {
  const projects = await projectService.getProjects();

  res.status(200).json({
    success: true,
    message: "Projects fetched successfully",
    data: projects,
  });
};

export { createProject, getProjects };
