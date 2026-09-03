import adminService from "../services/admin.service.js";

const getAllUsersController = async (req, res) => {
  const users = await adminService.getAllUsers();

  res.status(200).json({
    success: true,
    message: "Users fetched successfully",
    data: users,
  });
};

const getUserByIdController = async (req, res) => {
  const user = await adminService.getUserById(req.params.id);
  res.status(200).json({
    success: true,
    message: "User fetched successfully",
    data: user,
  });
};

const updateUserRoleController = async (req, res) => {
  const { role } = req.body;

  const user = await adminService.updateUserRole(req.params.id, role);

  res.status(200).json({
    success: true,
    message: "User role updated successfully",
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

const getAllProjectsController = async (req, res) => {
  const projects = await adminService.getAllProjects();

  res.status(200).json({
    success: true,
    message: "Projects fetched successfully",
    data: projects,
  });
};
const getProjectByIdController = async (req, res) => {
  const project = await adminService.getProjectById(req.params.id);

  res.status(200).json({
    success: true,
    message: "Project fetched successfully",
    data: project,
  });
};

const deleteProjectController = async (req, res) => {
  const project = await adminService.deleteProject(req.params.id);

  res.status(200).json({
    success: true,
    message: "Project deleted successfully",
    data: project,
  });
};

export default {
  getAllUsersController,
  getUserByIdController,
  updateUserRoleController,
  getAllProjectsController,
  getProjectByIdController,
  deleteProjectController,
};
