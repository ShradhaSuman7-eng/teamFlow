import Project from "../models/project.model.js";

const taskListingAuthorization = async (req, res, next) => {
  const userId = req.user.userId;

  const projects = await Project.find({
    $or: [{ createdBy: userId }, { "members.user": userId }],
  });

  const fullAccessProjectIds = [];
  const assignedOnlyProjectIds = [];

  for (const project of projects) {
    // Owner
    if (project.createdBy.toString() === userId.toString()) {
      fullAccessProjectIds.push(project._id);
      continue;
    }

    // Find user's membership
    const member = project.members.find(
      (member) => member.user.toString() === userId.toString(),
    );

    if (!member) {
      continue;
    }

    // Manager
    if (member.role === "manager") {
      fullAccessProjectIds.push(project._id);
    }

    // Member
    if (member.role === "member") {
      assignedOnlyProjectIds.push(project._id);
    }
  }

  req.taskAccess = {
    fullAccessProjectIds,
    assignedOnlyProjectIds,
  };

  next();
};

export default taskListingAuthorization;
