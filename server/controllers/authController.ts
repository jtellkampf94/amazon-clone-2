import { Request, Response, NextFunction } from "express";

import User from "../models/User";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrorsMiddleware from "../middlewares/catchAsyncErrorsMiddleware";

// Register user => /api/v1/register

export const registerUser = catchAsyncErrorsMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        publicId: "",
        url: ""
      }
    });

    res.status(201).json({
      success: true,
      user
    });
  }
);
