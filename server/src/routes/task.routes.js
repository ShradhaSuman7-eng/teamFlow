import express from "express";
import taskOwnerMiddleware from "../middleware/taskOwner.middleware.js";

import {
  createTask,
  getTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
} from "../controllers/task.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

import validateTask from "../middleware/validateTask.js";
import { deleteProjectById } from "../controllers/project.controller.js";

const router = express.Router();

router.post("/", authMiddleware, validateTask, createTask);
router.get("/", authMiddleware, getTasks);
router.get("/:id", authMiddleware, getTaskById);
router.patch("/:id", authMiddleware, taskOwnerMiddleware, updateTaskById);
router.delete("/:id", authMiddleware, taskOwnerMiddleware, deleteTaskById);

export default router;
