import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import {
  createProject,
  getProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById,
} from "../controllers/project.controller.js";

import validateProject from "../middleware/validateProject.js";
import paginationmiddleware from "../middleware/pagination.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, validateProject, createProject);

router.get("/", authMiddleware, paginationmiddleware, getProjects);

router.get("/:id", authMiddleware, getProjectById);

router.patch("/:id", authMiddleware, updateProjectById);

router.delete("/:id", authMiddleware, deleteProjectById);

export default router;
