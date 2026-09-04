import Task from "../models/task.model.js";
import User from "../models/user.model.js";
import Project from "../models/project.model.js";
import AppError from "../utils/AppError.js";

const createTask = async (taskData) => {
  const { project, assignedTo } = taskData;

  // Check if project exists
  const existingProject = await Project.findById(project);

  if (!existingProject) {
    throw new AppError("Project not found", 404);
  }

  // Validate assigned user
  if (assignedTo) {
    const user = await User.findById(assignedTo);

    if (!user) {
      throw new AppError("Assigned user not found", 404);
    }

    // Check if assigned user is a project member
    const isProjectMember = existingProject.members.some(
      (member) => member.user.toString() === assignedTo.toString(),
    );

    // Check if assigned user is project owner
    const isProjectOwner =
      existingProject.createdBy.toString() === assignedTo.toString();

    if (!isProjectMember && !isProjectOwner) {
      throw new AppError("Assigned user is not a member of this project", 400);
    }
  }

  const task = await Task.create(taskData);

  return task;
};

const getTasks = async (filters) => {
  const query = {};

  const { fullAccessProjectIds, assignedOnlyProjectIds } = filters.taskAccess;

  const authorizationConditions = [];

  // Owner / Manager
  if (fullAccessProjectIds.length > 0) {
    authorizationConditions.push({
      project: { $in: fullAccessProjectIds },
    });
  }

  // Member
  if (assignedOnlyProjectIds.length > 0) {
    authorizationConditions.push({
      project: { $in: assignedOnlyProjectIds },
      assignedTo: filters.userId,
    });
  }

  // User has no access to any project
  if (authorizationConditions.length === 0) {
    query._id = null;
  } else {
    query.$or = authorizationConditions;
  }

  // Status filter
  if (filters.status) {
    query.status = filters.status;
  }

  // Priority filter
  if (filters.priority) {
    query.priority = filters.priority;
  }

  // Project filter
  if (filters.project) {
    query.project = filters.project;
  }

  // Search filter
  if (filters.search) {
    query.$and = [
      {
        $or: [
          {
            title: {
              $regex: filters.search,
              $options: "i",
            },
          },
          {
            description: {
              $regex: filters.search,
              $options: "i",
            },
          },
        ],
      },
    ];
  }

  // Pagination
  const page = Number(filters.page) || 1;
  const limit = Number(filters.limit) || 10;

  const skip = (page - 1) * limit;

  // Sorting
  const sortBy = filters.sortBy || "createdAt";
  const order = filters.order === "asc" ? 1 : -1;

  // Count authorized tasks
  const totalTasks = await Task.countDocuments(query);

  // Fetch tasks
  const tasks = await Task.find(query)
    .sort({ [sortBy]: order })
    .skip(skip)
    .limit(limit)
    .populate("project", "name description status priority")
    .populate("createdBy", "name email role")
    .populate("assignedTo", "name email role");

  const totalPages = Math.ceil(totalTasks / limit);

  return {
    tasks,
    pagination: {
      page,
      limit,
      totalTasks,
      totalPages,
    },
  };
};

const getTaskById = async (id) => {
  const task = await Task.findById(id)
    .populate("project", "name description status priority")
    .populate("createdBy", "name email role")
    .populate("assignedTo", "name email role");

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  return task;
};

const updateTaskById = async (id, updatedData, userId) => {
  const allowedFields = [
    "title",
    "description",
    "project",
    "assignedTo",
    "priority",
    "status",
    "dueDate",
  ];

  const filteredData = {};

  // Keep only allowed fields
  for (const field of allowedFields) {
    if (updatedData[field] !== undefined) {
      filteredData[field] = updatedData[field];
    }
  }

  // Get existing task
  const existingTask = await Task.findById(id);

  if (!existingTask) {
    throw new AppError("Task not found", 404);
  }

  // Determine final project
  const finalProjectId = filteredData.project || existingTask.project;

  // Get final project
  const project = await Project.findById(finalProjectId);

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  // Check if task is being moved to another project
  const isProjectChanging =
    filteredData.project &&
    filteredData.project.toString() !== existingTask.project.toString();

  if (isProjectChanging) {
    let newProjectRole = null;

    // Check if user is the owner of the new project
    if (project.createdBy.toString() === userId.toString()) {
      newProjectRole = "owner";
    } else {
      // Check user's role in the new project
      const member = project.members.find(
        (member) => member.user.toString() === userId.toString(),
      );

      if (member) {
        newProjectRole = member.role;
      }
    }

    // Only owner or manager can move a task
    if (!["owner", "manager"].includes(newProjectRole)) {
      throw new AppError(
        "You do not have permission to move this task to the selected project",
        403,
      );
    }
  }

  // Determine final assigned user
  const finalAssignedTo =
    filteredData.assignedTo !== undefined
      ? filteredData.assignedTo
      : existingTask.assignedTo;

  // Validate assigned user
  if (finalAssignedTo) {
    const user = await User.findById(finalAssignedTo);

    if (!user) {
      throw new AppError("Assigned user not found", 404);
    }

    // Check if assigned user is a member of final project
    const isProjectMember = project.members.some(
      (member) => member.user.toString() === finalAssignedTo.toString(),
    );

    // Check if assigned user is owner of final project
    const isProjectOwner =
      project.createdBy.toString() === finalAssignedTo.toString();

    if (!isProjectMember && !isProjectOwner) {
      throw new AppError("Assigned user is not a member of this project", 400);
    }
  }

  // Check if requester is changing task assignment
  if (filteredData.assignedTo !== undefined) {
    let requesterRole = null;

    // Check if requester is project owner
    if (project.createdBy.toString() === userId.toString()) {
      requesterRole = "owner";
    } else {
      // Check requester's project membership role
      const requesterMember = project.members.find(
        (member) => member.user.toString() === userId.toString(),
      );

      if (requesterMember) {
        requesterRole = requesterMember.role;
      }
    }

    // Only owner and manager can change task assignment
    if (!["owner", "manager"].includes(requesterRole)) {
      throw new AppError("You do not have permission to assign this task", 403);
    }
  }

  // Update task
  const task = await Task.findByIdAndUpdate(id, filteredData, {
    returnDocument: "after",
    runValidators: true,
  })
    .populate("project", "name description status priority")
    .populate("createdBy", "name email role")
    .populate("assignedTo", "name email role");

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  return task;
};

const deleteTaskById = async (id) => {
  const task = await Task.findByIdAndDelete(id);

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  return task;
};

export default {
  createTask,
  getTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
};
