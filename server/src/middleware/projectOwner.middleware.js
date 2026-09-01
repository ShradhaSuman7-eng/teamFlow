import Project from "../models/project.model.js";
import AppError from "../utils/AppError.js";

const projectOwnerMiddleware = async (req, res, next) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    throw new AppError("Project Not Found", 404);
  }

  if (project.createdBy.toString() !== req.user.userId) {
    throw new AppError("You are not allowed to modify this project", 403);
  }

  req.project = project;

  next();
};

export default projectOwnerMiddleware;
