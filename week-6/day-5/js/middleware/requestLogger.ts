import type { Request, Response, NextFunction } from "express";
export function requestLogger(req: Request, res: Response, next: NextFunction) {
  console.log(`Logging: ${req.method} and current endpoint: ${req.url}`);
  next();
}
