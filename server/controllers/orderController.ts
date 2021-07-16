import { Request, Response, NextFunction } from "express";

import Order from "../models/Order";
import Product from "../models/Product";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrorsMiddleware from "../middlewares/catchAsyncErrorsMiddleware";
import APIFeatures from "../utils/apiFeatures";

// Create new order => /api/v1/order/new
export const createOrder = catchAsyncErrorsMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      orderItems,
      shippingInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paymentInfo
    } = req.body;

    const order = await Order.create({
      orderItems,
      shippingInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paymentInfo,
      paidAt: Date.now(),
      //@ts-ignore
      user: req.user._id
    });

    res.status(201).json({
      success: true,
      order
    });
  }
);
