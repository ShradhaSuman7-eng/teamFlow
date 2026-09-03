import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";

import adminController from "../controllers/admin.controller.js";
import validateObjectId from "../middleware/validateObjectId.js";

const router = express.Router();

// Test Admin Access
router.get("/test", authMiddleware, adminMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome Admin",
  });
});

// Get All Users
router.get(
  "/users",
  authMiddleware,
  adminMiddleware,
  adminController.getAllUsersController,
);

router.get(
  "/users/:id",
  authMiddleware,
  validateObjectId("id"),
  adminMiddleware,
  adminController.getUserByIdController,
);

router.patch(
  "/users/:id/role",
  authMiddleware,
  validateObjectId("id"),
  adminMiddleware,
  adminController.updateUserRoleController,
);

router.get(
  "/projects",
  authMiddleware,
  adminMiddleware,
  adminController.getAllProjectsController,
);

router.get(
  "/projects/:id",
  authMiddleware,
  validateObjectId("id"),
  adminMiddleware,
  adminController.getProjectByIdController,
);

router.delete(
  "/projects/:id",
  authMiddleware,
  validateObjectId("id"),
  adminMiddleware,
  adminController.deleteProjectController,
);
export default router;
