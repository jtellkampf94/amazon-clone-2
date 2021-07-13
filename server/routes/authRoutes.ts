import express from "express";
const router = express.Router();

import { registerUser } from "../controllers/authController";

router.route("/register").post(registerUser);

export default router;
