import type { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../utils/error";
import type { AuthenticateUser } from "../types/auth";
import { verify } from "node:crypto";
import { verifyToken } from "../utils/jwt";

export function requireAuth(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader?.startsWith(`Bearer`)) {
      return next(new UnauthorizedError());
    }

    const token = authHeader.replace(`Bearer `, "");
    (request as AuthenticateUser).user = verifyToken(token);
  } catch {
    next(new UnauthorizedError());
  }
}
