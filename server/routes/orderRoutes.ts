import express from "express";
const router = express.Router();

import {
  createOrder,
  getSingleOrder,
  getOrders,
  getAllOrders,
  updateOrder,
  deleteOrder
} from "../controllers/orderController";
import {
  isAuthenticatedUser,
  authorizedRoles
} from "../middlewares/authMiddleware";

router.route("/order/new").post(isAuthenticatedUser, createOrder);

router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/orders").get(isAuthenticatedUser, getOrders);

router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getAllOrders);

router
  .route("/admin/order/:id")
  .get(isAuthenticatedUser, authorizedRoles("admin"), updateOrder)
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteOrder);

export default router;
