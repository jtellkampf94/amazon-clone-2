import { Request, Response, NextFunction } from "express";
import crypto from "crypto";

import User from "../models/User";
import catchAsyncErrorsMiddleware from "../middlewares/catchAsyncErrorsMiddleware";
import ErrorHandler from "../utils/errorHandler";
import { sendToken } from "./../utils/jwtToken";
import sendEmail from "../utils/sendEmail";

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

// Forgot password => /api/v1/password/forgot
export const forgotPassword = catchAsyncErrorsMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return next(new ErrorHandler("User not found with this email", 404));
    }

    // Get Reset sendToken
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // Create reset password url
    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/password/reset/${resetToken}`;

    const message = `Click on this link to change password:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Reset Password",
        message
      });

      res.status(200).json({
        success: true,
        message: `Email sent to: ${user.email}`
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save({ validateBeforeSave: false });

      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Reset password => /api/v/password/reset/:token
export const resetPassword = catchAsyncErrorsMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    // Hash URL token
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return next(
        new ErrorHandler("Password reset token is invalid or expired", 400)
      );
    }

    if (req.body.password !== req.body.confirmPassword) {
      return next(new ErrorHandler("Password does not match", 400));
    }

    // Set up new password
    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

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

// Get currently logged in user details => api/v1/profile
export const getUserProfile = catchAsyncErrorsMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      user
    });
  }
);

// change password /api/v1/password/update
export const updatePassword = catchAsyncErrorsMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    const user = await User.findById(req.user.id).select("+password");

    // Check previous password
    const isMatchedPassword = await user.comparePassword(req.body.oldPassword);

    if (!isMatchedPassword) {
      return next(new ErrorHandler("Old password is incorrect", 400));
    }

    user.password = req.body.password;
    await user.save();

    sendToken(user, 200, res);
  }
);

// Update Profile => api/v1/profile
export const updateProfile = catchAsyncErrorsMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email
    };

    //@ts-ignore
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false
    });

    res.status(200).json({
      success: true
    });
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

// Admin Routes

// Get all users => /api/v1/admin/users
export const getAllUsers = catchAsyncErrorsMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.find();

    res.status(200).json({
      success: true,
      users
    });
  }
);

// Get user detail => /api/v1/admin/user/:id
export const getUserDetails = catchAsyncErrorsMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(
        new ErrorHandler(`User with id: ${req.params.id} does not exist`, 404)
      );
    }

    res.status(200).json({
      success: true,
      user
    });
  }
);

// Update user Profile => api/v1/admin/user/:id
export const updateUser = catchAsyncErrorsMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role
    };

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false
    });

    res.status(200).json({
      success: true
    });
  }
);

// Delete => /api/v1/admin/user/:id
export const deleteUser = catchAsyncErrorsMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(
        new ErrorHandler(`User with id: ${req.params.id} does not exist`, 404)
      );
    }

    await user.remover();

    res.status(200).json({
      success: true
    });
  }
);
