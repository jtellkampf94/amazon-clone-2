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

// Get single order => /api/v1/order/:id
export const getSingleOrder = catchAsyncErrorsMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      return next(new ErrorHandler("No order found with this ID", 404));
    }

    res.status(200).json({
      success: true,
      order
    });
  }
);

// Get logged in users orders => /api/v1/orders
export const getOrders = catchAsyncErrorsMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    const orders = await Order.find({ user: req.user._id });

    res.status(200).json({
      success: true,
      orders
    });
  }
);

interface Order {
  totalPrice: number;
}

// Get all orders => /api/v1/admin/orders
export const getAllOrders = catchAsyncErrorsMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const orders = await Order.find();

    let totalAmount = 0;
    orders.forEach((order: Order) => {
      totalAmount += order.totalPrice;
    });

    res.status(200).json({
      success: true,
      totalAmount,
      orders
    });
  }
);

interface Item {
  product: string;
  quantity: number;
}

// Update / Process orders => /api/v1/admin/order/:id
export const updateOrder = catchAsyncErrorsMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const order = await Order.findById(req.params.id);

    if (order.orderStatus === "Delivered") {
      return next(
        new ErrorHandler("You have already delivered this order", 400)
      );
    }

    order.orderItems.forEach(async (item: Item) => {
      await updateStock(item.product, item.quantity);
    });

    order.orderStatus = req.body.status;
    order.deliveredAt = Date.now();

    await order.save();

    res.status(200).json({
      success: true,
      order
    });
  }
);

const updateStock = async (id: string, quantity: number) => {
  const product = await Product.findById(id);

  product.stock = product.stock - quantity;

  await product.save({ validateBeforeSave: false });
};

// Delete order => /api/v1/admin/order/:id
export const deleteOrder = catchAsyncErrorsMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ErrorHandler("No order found with this ID", 404));
    }

    await order.remove();

    res.status(200).json({
      success: true
    });
  }
);
