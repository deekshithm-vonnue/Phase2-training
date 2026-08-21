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
  res.status(err.statusCode).send(err.message);
}
