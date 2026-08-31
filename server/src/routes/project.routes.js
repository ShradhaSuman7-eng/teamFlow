import express from "express";

import {
  createProject,
  getProjects,
} from "../controllers/project.controller.js";
import validateProject from "../middleware/validateProject.js";

const router = express.Router();

router.post("/", validateProject, createProject);
router.get("/", getProjects);

export default router;
