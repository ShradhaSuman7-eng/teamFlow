import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import validateObjectId from "../middleware/validateObjectId.js";
import projectOwnerMiddleware from "../middleware/projectOwner.middleware.js";

import {
  addMember,
  getMembers,
  removeMember,
} from "../controllers/projectMember.controller.js";

const router = express.Router();

router.post(
  "/:id/members",
  authMiddleware,
  validateObjectId("id"),
  projectOwnerMiddleware,
  addMember,
);

router.get(
  "/:id/members",
  authMiddleware,
  validateObjectId("id"),
  projectOwnerMiddleware,
  getMembers,
);

router.delete(
  "/:id/members/:userId",
  authMiddleware,
  validateObjectId("id"),
  validateObjectId("userId"),
  projectOwnerMiddleware,
  removeMember,
);

export default router;
