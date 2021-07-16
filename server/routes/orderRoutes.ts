import express from "express";
const router = express.Router();

import { createOrder } from "../controllers/orderController";
import {
  isAuthenticatedUser,
  authourizedRoles
} from "../middlewares/authMiddleware";

router.route("/order/new").post(isAuthenticatedUser, createOrder);

export default router;
