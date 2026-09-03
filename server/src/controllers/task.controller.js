import taskService from "../services/task.service.js";

const createTask = async (req, res) => {
  const data = {
    ...req.body,
    createdBy: req.user.userId,
  };

  const task = await taskService.createTask(data);

  res.status(201).json({
    success: true,
    message: "Task created successfully",
    data: task,
  });
};

const getTasks = async (req, res) => {
  const filters = {
    ...req.query,
    taskAccess: req.taskAccess,
    userId: req.user.userId,
  };

  console.log("TASK ACCESS:", req.taskAccess);

  const result = await taskService.getTasks(filters);

  res.status(200).json({
    success: true,
    message: "Tasks fetched successfully",
    data: result.tasks,
    pagination: result.pagination,
  });
};

const getTaskById = async (req, res) => {
  const id = req.params.id;

  const task = await taskService.getTaskById(id);

  res.status(200).json({
    success: true,
    message: "Task fetched successfully",
    data: task,
  });
};

const updateTaskById = async (req, res) => {
  const id = req.params.id;
  const newData = req.body;

  const task = await taskService.updateTaskById(id, newData);

  res.status(200).json({
    success: true,
    message: "Task updated successfully",
    data: task,
  });
};

const deleteTaskById = async (req, res) => {
  const id = req.params.id;

  const task = await taskService.deleteTaskById(id);

  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
    data: task,
  });
};

export { createTask, getTasks, getTaskById, updateTaskById, deleteTaskById };
