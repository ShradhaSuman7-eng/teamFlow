import express from "express";

import {
  createProject,
  getProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById,
} from "../controllers/project.controller.js";

import validateProject from "../middleware/validateProject.js";

const router = express.Router();

router.post("/", validateProject, createProject);

router.get("/", getProjects);

router.get("/:id", getProjectById);

router.patch("/:id", updateProjectById);
router.delete("/:id", deleteProjectById);

export default router;
