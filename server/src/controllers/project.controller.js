import projectService from "../services/project.service.js";

const createProject = async (req, res) => {
  const project = await projectService.createProject({
    ...req.body,
    createdBy: req.user.userId,
  });

  res.status(201).json({
    success: true,
    message: "Project created successfully",
    data: project,
  });
};

const getProjects = async (req, res) => {
  const { page, limit } = req.pagination;
  const { status, priority, sort, order } = req.query;

  const result = await projectService.getProjects(
    page,
    limit,
    status,
    priority,
    sort,
    order,
  );

  res.status(200).json({
    success: true,
    message: "Projects fetched successfully",
    data: result.projects,
    pagination: result.pagination,
  });
};

const getProjectById = async (req, res) => {
  const project = await projectService.getProjectById(req.params.id);

  res.status(200).json({
    success: true,
    message: "Project fetched successfully",
    data: project,
  });
};

const updateProjectById = async (req, res) => {
  const project = await projectService.updateProjectById(
    req.params.id,
    req.body,
  );

  res.status(200).json({
    success: true,
    message: "Project updated successfully",
    data: project,
  });
};

const deleteProjectById = async (req, res) => {
  const project = await projectService.deleteProjectById(req.params.id);

  res.status(200).json({
    success: true,
    message: "Project deleted successfully",
    data: project,
  });
};

export {
  createProject,
  getProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById,
};
