import express from "express";
const router = express.Router();

import {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updatePassword,
  updateProfile,
  getAllUsers,
  getUserDetails,
  updateUser,
  deleteUser
} from "../controllers/authController";
import {
  isAuthenticatedUser,
  authourizedRoles
} from "../middlewares/authMiddleware";

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logoutUser);

router
  .route("/profile")
  .get(isAuthenticatedUser, getUserProfile)
  .put(isAuthenticatedUser, updateProfile);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);

router
  .route("/admin/users")
  .get(isAuthenticatedUser, authourizedRoles("admin"), getAllUsers);

router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authourizedRoles("admin"), getUserDetails)
  .put(isAuthenticatedUser, authourizedRoles("admin"), updateUser)
  .delete(isAuthenticatedUser, authourizedRoles("admin"), deleteUser);

export default router;
