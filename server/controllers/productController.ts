import { Request, Response, NextFunction } from "express";

import Product from "../models/Product";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrorsMiddleware from "../middlewares/catchAsyncErrorsMiddleware";
import APIFeatures from "../utils/apiFeatures";

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

// Get all products => /api/v1/products?keyword=apple
export const getProducts = catchAsyncErrorsMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const resultsPerPage = 4;
    const productCount = await Product.countDocuments();

    const apiFeatures = new APIFeatures(Product.find(), req.query)
      .search()
      .filter()
      .pagination(resultsPerPage);

    const products = await apiFeatures.query;

    res.status(200).json({
      success: true,
      count: products.length,
      productCount,
      products
    });
  }
);

// Get single product => /api/v1/product/:id
export const getSingleProduct = catchAsyncErrorsMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.findById(req.params.id);

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
      return next(new ErrorHandler("Product not found", 404));
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
      return next(new ErrorHandler("Product not found", 404));
    }

    await product.remove();

    res.status(200).json({
      success: true,
      message: "Product is deleted"
    });
  }
);
