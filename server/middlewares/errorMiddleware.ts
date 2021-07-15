import { ErrorsObject } from "./../utils/errorHandler";
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

    // Wrong mongoose Object ID error
    if (err.name === "CastError") {
      const message = `Resource not found. Invalid: ${err.path}`;
      error = new ErrorHandler(message, 400);
    }

    // Handling mongoose validation error
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors)
        .map((value: ErrorsObject["value"]) => value.message)
        .join(", ");
      error = new ErrorHandler(message, 400);
    }

    // Handling mongoose duplicate key error
    //@ts-ignore
    if (err.code == 11000) {
      //@ts-ignore
      const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
      error = new ErrorHandler(message, 400);
    }

    // Handling JWT error
    if (err.name === "JsonWebTokenError") {
      const message = "JSON Web Token is invalid. Try again.";
      error = new ErrorHandler(message, 400);
    }

    if (err.name === "TokenExpiredError") {
      const message = "JSON Web Token is expired. Try again.";
      error = new ErrorHandler(message, 400);
    }

    res.status(error.statusCode).json({
      success: false,
      message: error.message || "Internal Server Error"
    });
  }
};

export default errorMiddleware;
