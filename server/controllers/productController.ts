import { Request, Response, NextFunction } from "express";

import Product from "../models/Product";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrorsMiddleware from "../middlewares/catchAsyncErrorsMiddleware";

// Create new product => /api/v1/admin/products/new
export const createProduct = catchAsyncErrorsMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      product
    });
  }
);

// Get all products => /api/v1/products
export const getProducts = catchAsyncErrorsMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      count: products.length,
      products
    });
  }
);

// Get single product => /api/v1/product/:id
export const getSingleProduct = catchAsyncErrorsMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.findById(req.params.id);

    console.log("GSP");
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
      success: true,
      product
    });
  }
);

// Update Product => /api/v1/admin/product/:id
export const updateProduct = catchAsyncErrorsMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false
    });

    res.status(200).json({
      success: true,
      product
    });
  }
);

// Delete product => /api/v1/admin/product/:id
export const deleteProduct = catchAsyncErrorsMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    await product.remove();

    res.status(200).json({
      success: true,
      message: "Product is deleted"
    });
  }
);
