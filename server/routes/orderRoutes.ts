import express from "express";
const router = express.Router();

import {
  createOrder,
  getSingleOrder,
  getOrders
} from "../controllers/orderController";
import {
  isAuthenticatedUser,
  authorizedRoles
} from "../middlewares/authMiddleware";

router.route("/order/new").post(isAuthenticatedUser, createOrder);

router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/orders").get(isAuthenticatedUser, getOrders);

export default router;
