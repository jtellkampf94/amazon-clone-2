import express from "express";
const router = express.Router();

import { processPayment, getStripeAPI } from "../controllers/paymentController";
import { isAuthenticatedUser } from "../middlewares/authMiddleware";

router.route("/payment/process").post(isAuthenticatedUser, processPayment);
router.route("/stripeapi").get(isAuthenticatedUser, getStripeAPI);

export default router;
