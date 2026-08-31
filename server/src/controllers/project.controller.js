import projectService from "../services/project.service.js";

const createProject = async (req, res) => {
  const project = await projectService.createProject(req.body);

  res.status(201).json({
    success: true,
    message: "Project created successFully",
    data: project,
  });
};

export default createProject;
