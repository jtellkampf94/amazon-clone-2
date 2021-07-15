import { Request, Response, NextFunction } from "express";

import User from "../models/User";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrorsMiddleware from "../middlewares/catchAsyncErrorsMiddleware";
import { sendToken } from "../utils/jwtToken";

// Register user => /api/v1/register
export const registerUser = catchAsyncErrorsMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        publicId: "555",
        url: "www.google.com"
      }
    });

    sendToken(user, 200, res);
  }
);

// Login user => /api/v1/login
export const loginUser = catchAsyncErrorsMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    // checks if email and password is entered by user
    if (!email || !password) {
      return next(new ErrorHandler("Please enter email & password", 400));
    }

    // Find user in db
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("Invalid email or passord", 401));
    }

    // check if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid email or passord", 401));
    }

    sendToken(user, 200, res);
  }
);

// Logout user /api/v1/logout
export const logoutUser = catchAsyncErrorsMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true
    });

    res.status(200).json({
      success: true,
      message: "Logged out"
    });
  }
);
