import { type Request, type Response, type NextFunction } from "express";

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("Logging- method: " + req.method + ",url: " + req.originalUrl);
  next();
};
