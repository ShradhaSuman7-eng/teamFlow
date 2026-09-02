import Project from "../models/project.model.js";
import AppError from "../utils/AppError.js";

const projectAuthorization = (...allowedRoles) => {
  return async (req, res, next) => {
    const projectId = req.params.id;
    const userId = req.user.userId;

    const project = await Project.findById(projectId);

    if (!project) {
      throw new AppError("Project not found", 404);
    }

    let userRole = null;

    if (project.createdBy.toString() === userId) {
      userRole = "owner";
    } else {
      const member = project.members.find(
        (member) => member.user.toString() === userId,
      );

      if (member) {
        userRole = member.role;
      }
    }

    if (!userRole || !allowedRoles.includes(userRole)) {
      throw new AppError(
        "You do not have permission to perform this action",
        403,
      );
    }

    req.project = project;
    req.projectRole = userRole;

    next();
  };
};

export default projectAuthorization;
