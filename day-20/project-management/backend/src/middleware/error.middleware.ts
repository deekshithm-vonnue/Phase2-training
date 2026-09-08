import type { NextFunction, Request, Response } from "express";
import { error } from "node:console";
import { ZodError } from "zod";
import { AppError } from "../utils/error";
import { Prisma } from "../generated/prisma/client";

export function notFoundHandler(
  _request: Request,
  response: Response,
  _next: NextFunction,
) {
  response.status(404).json({
    error: {
      code: "NOT_FOUND",
      message: "Route is not found",
    },
  });
}

export function errorHandler(
  error: unknown,
  _request: Request,
  response: Response,
  _next: NextFunction,
) {
  if (error instanceof ZodError) {
    response.status(400).json({
      error: {
        code: "VALIDATION_ERROR",
        message: "Request validation failed",
      },
    });
    return;
  }

  if (error instanceof AppError) {
    response.status(error.statusCode).json({
      error: {
        code: error.code,
        message: error.message,
      },
    });
    return;
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    response.status(400).json({
      error: {
        code: "DATABASE_ERROR",
        message: "Database connection failed",
      },
    });
    return;
  }

  response.status(500).json({
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "Unexpected error",
    },
  });
}
