import express from "express";
const router = express.Router();

import {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword
} from "../controllers/authController";

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logoutUser);

export default router;
