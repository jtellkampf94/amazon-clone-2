import express from "express";
const router = express.Router();

import { processPayment } from "../controllers/paymentController";
import { isAuthenticatedUser } from "../middlewares/authMiddleware";

router.route("/payment/process").post(isAuthenticatedUser, processPayment);

export default router;
