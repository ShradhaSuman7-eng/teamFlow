import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import validateProject from "../middleware/validateProject.js";
import paginationMiddleware from "../middleware/pagination.middleware.js";
import validateObjectId from "../middleware/validateObjectId.js";
import projectAuthorization from "../middleware/projectAuthorization.middleware.js";
import validateProjectUpdate from "../middleware/validateProjectUpdate.js";

import {
  createProject,
  getProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById,
} from "../controllers/project.controller.js";

const router = express.Router();

// Create project
router.post("/", authMiddleware, validateProject, createProject);

// Get all projects
router.get("/", authMiddleware, paginationMiddleware, getProjects);

// Get project by ID
router.get(
  "/:id",
  authMiddleware,
  validateObjectId("id"),
  projectAuthorization("owner", "manager", "member"),
  getProjectById,
);

// Update project
router.patch(
  "/:id",
  authMiddleware,
  validateObjectId("id"),
  validateProjectUpdate,
  projectAuthorization("owner"),
  updateProjectById,
);

// Delete project
router.delete(
  "/:id",
  authMiddleware,
  validateObjectId("id"),
  projectAuthorization("owner"),
  deleteProjectById,
);

export default router;
