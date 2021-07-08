import { Request, Response, NextFunction } from "express";

const catchAsyncErrorsMiddleware = (
  func: (req: Request, res: Response, next: NextFunction) => {}
) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(func(req, res, next)).catch(next);

export default catchAsyncErrorsMiddleware;
