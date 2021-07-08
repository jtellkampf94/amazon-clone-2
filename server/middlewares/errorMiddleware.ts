import { Request, Response, NextFunction } from "express";

import ErrorHandler from "../utils/errorHandler";

const errorMiddleware = async (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      stack: err.stack
    });
  }

  if (process.env.NODE_ENV === "PRODUCTION") {
    let error = { ...err };
    error.message = err.message;
    res.status(error.statusCode).json({
      success: false,
      message: error.message || "Internal Server Error"
    });
  }
};

export default errorMiddleware;
