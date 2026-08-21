import type { Request, Response, NextFunction } from "express";
import { AppError } from "../types/appError.ts";
export async function notFoundHandler(req: Request, res: Response) {
  res.status(404).send("Not found - 404");
}

export async function errorhandler(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const statusCode = Number.isInteger(err.statusCode) ? err.statusCode : 500;
  const message = err.message || "An unexpected error occurred";
  // console.error("Unhandled Error logged:", err);

  res.status(statusCode).json({
    status: "error",
    statusCode: statusCode,
    message: message
  });
}
