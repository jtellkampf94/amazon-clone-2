import { Request, Response, NextFunction } from "express";

import Product from "../models/Product";

// Create new product
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product
  });
};

export const getProducts = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).json({
    success: true,
    message: "This route will show all products in database"
  });
};
