import Task from "../models/task.model.js";
import Project from "../models/project.model.js";
import AppError from "../utils/AppError.js";

const taskAuthorization = (action) => {
  return async (req, res, next) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
      throw new AppError("Task not found", 404);
    }

    const project = await Project.findById(task.project);

    if (!project) {
      throw new AppError("Project not found", 404);
    }

    const userId = req.user.userId;

    // Find user's project role
    let userRole = null;

    if (project.createdBy.toString() === userId.toString()) {
      userRole = "owner";
    } else {
      const member = project.members.find(
        (member) => member.user.toString() === userId.toString(),
      );

      if (member) {
        userRole = member.role;
      }
    }

    console.log("USER ROLE:", userRole);

    // User is not part of the project
    if (!userRole) {
      throw new AppError("You are not a member of this project", 403);
    }

    // View permission
    if (action === "view") {
      if (userRole === "owner" || userRole === "manager") {
        next();
        return;
      }

      if (
        userRole === "member" &&
        task.assignedTo?.toString() === userId.toString()
      ) {
        next();
        return;
      }

      throw new AppError("You do not have permission to view this task", 403);
    }

    // Update permission
    if (action === "update") {
      if (userRole === "owner" || userRole === "manager") {
        next();
        return;
      }

      if (
        userRole === "member" &&
        task.assignedTo?.toString() === userId.toString()
      ) {
        next();
        return;
      }

      throw new AppError("You do not have permission to update this task", 403);
    }

    if (action === "delete") {
      if (userRole === "owner") {
        next();
        return;
      }

      throw new AppError("You do not have permission to delete this task", 403);
    }
  };
};

export default taskAuthorization;
