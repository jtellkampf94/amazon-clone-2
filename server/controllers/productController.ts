import { Request, Response, NextFunction } from "express";

import Product from "../models/Product";

// Create new product => /api/v1/admin/products/new
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      product
    });
  } catch (error) {
    console.log(error);
  }
};

// Get all products => /api/v1/products
export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    console.log(error);
  }
};

// Get single product => /api/v1/product/:id
export const getSingleProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    console.log(error);
  }
};

// Update Product => /api/v1/admin/product/:id
export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
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
  } catch (error) {
    console.log(error);
  }
};

// Delete product => /api/v1/admin/product/:id
export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
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
  } catch (error) {
    console.log(error);
  }
};
