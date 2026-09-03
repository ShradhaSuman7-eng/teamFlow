import express from "express";

import {
  createTask,
  getTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
} from "../controllers/task.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import validateTask from "../middleware/validateTask.js";
import validateTaskQuery from "../middleware/validateTaskQuery.js";
import validateTaskUpdate from "../middleware/validateTaskUpdate.js";
import validateObjectId from "../middleware/validateObjectId.js";
import taskProjectAuthorization from "../middleware/taskProjectAuthorization.middleware.js";
import taskAuthorization from "../middleware/taskAuthorization.middleware.js";
import taskListingAuthorization from "../middleware/tastaskListingAuthorization.middleware.js";

const router = express.Router();

// Create Task
router.post(
  "/",
  authMiddleware,
  validateTask,
  taskProjectAuthorization("owner", "manager"),
  createTask,
);

// Get All Tasks
router.get(
  "/",
  authMiddleware,
  validateTaskQuery,
  taskListingAuthorization,
  getTasks,
);
// Get Task By ID
router.get(
  "/:id",
  authMiddleware,
  validateObjectId("id"),
  taskAuthorization("view"),
  getTaskById,
);

// Update Task
router.patch(
  "/:id",
  authMiddleware,
  validateObjectId("id"),
  taskAuthorization("update"),
  validateTaskUpdate,
  updateTaskById,
);

// Delete Task
router.delete(
  "/:id",
  authMiddleware,
  validateObjectId("id"),
  taskAuthorization("delete"),
  deleteTaskById,
);

export default router;
