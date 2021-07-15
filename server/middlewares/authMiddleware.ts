import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import catchAsyncErrorsMiddleware from "./catchAsyncErrorsMiddleware";
import ErrorHandler from "../utils/errorHandler";
import User from "../models/User";

// Checks if user is authenticated or not
export const isAuthenticatedUser = catchAsyncErrorsMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.cookies;

    if (!token) {
      return next(new ErrorHandler("Login first to access this resource", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    //@ts-ignore
    req.user = await User.findById(decoded.id);

    next();
  }
);

type RoleType = "admin" | "user";

// Handling users roles
export const authourizedRoles = (...roles: RoleType[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    if (!roles.includes(req.user.role)) {
      //@ts-ignore
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to access this resource`,
          403
        )
      );
    }
  };
};
