import express from "express";
import validateProject from "../middleware/validateProject.js";
import createProject from "../controllers/project.controller.js";

const router = express.Router();

router.post("/", validateProject, createProject);

export default router;
