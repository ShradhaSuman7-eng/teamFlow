import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import validateObjectId from "../middleware/validateObjectId.js";
import projectOwnerMiddleware from "../middleware/projectOwner.middleware.js";
import validateProjectMember from "../middleware/validateProjectMember.js";
import validateMemberRole from "../middleware/validateMemberRole.js";

import {
  addMember,
  getMembers,
  removeMember,
  updateMemberRole,
} from "../controllers/projectMember.controller.js";

const router = express.Router();

router.post(
  "/:id/members",
  authMiddleware,
  validateObjectId("id"),
  validateProjectMember,
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

router.patch(
  "/:id/members/:userId/role",
  authMiddleware,
  validateObjectId("id"),
  validateObjectId("userId"),
  validateMemberRole,
  projectOwnerMiddleware,
  updateMemberRole,
);

export default router;
