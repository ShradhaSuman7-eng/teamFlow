import Task from "../models/task.model.js";
import User from "../models/user.model.js";
import Project from "../models/project.model.js";
import AppError from "../utils/AppError.js";

const createTask = async (taskData) => {
  const { project, assignedTo } = taskData;

  const existingProject = await Project.findById(project);

  if (!existingProject) {
    throw new AppError("Project not found", 404);
  }

  if (assignedTo) {
    const user = await User.findById(assignedTo);

    if (!user) {
      throw new AppError("Assigned user not found", 404);
    }
  }

  const task = await Task.create(taskData);

  return task;
};

const getTasks = async (filters) => {
  const query = {};

  if (filters.createdBy) {
    query.createdBy = filters.createdBy;
  }

  if (filters.status) {
    query.status = filters.status;
  }

  if (filters.priority) {
    query.priority = filters.priority;
  }

  if (filters.project) {
    query.project = filters.project;
  }

  if (filters.search) {
    query.$or = [
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
    ];
  }

  const page = Number(filters.page) || 1;
  const limit = Number(filters.limit) || 10;

  const skip = (page - 1) * limit;

  const sortBy = filters.sortBy || "createdAt";
  const order = filters.order === "asc" ? 1 : -1;

  const totalTasks = await Task.countDocuments(query);

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

const updateTaskById = async (id, updatedData) => {
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

  for (const field of allowedFields) {
    if (updatedData[field] !== undefined) {
      filteredData[field] = updatedData[field];
    }
  }

  if (filteredData.project) {
    const project = await Project.findById(filteredData.project);

    if (!project) {
      throw new AppError("Project not found", 404);
    }
  }

  if (filteredData.assignedTo) {
    const user = await User.findById(filteredData.assignedTo);

    if (!user) {
      throw new AppError("Assigned user not found", 404);
    }
  }

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
