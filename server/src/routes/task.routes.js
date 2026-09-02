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
import taskOwnerMiddleware from "../middleware/taskOwner.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, validateTask, createTask);

router.get("/", authMiddleware, validateTaskQuery, getTasks);

router.get(
  "/:id",
  authMiddleware,
  validateObjectId,
  taskOwnerMiddleware,
  getTaskById,
);

router.patch(
  "/:id",
  authMiddleware,
  validateObjectId,
  taskOwnerMiddleware,
  validateTaskUpdate,
  updateTaskById,
);

router.delete(
  "/:id",
  authMiddleware,
  validateObjectId,
  taskOwnerMiddleware,
  deleteTaskById,
);

export default router;
