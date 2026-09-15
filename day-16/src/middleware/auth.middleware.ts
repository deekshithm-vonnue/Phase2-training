import type { NextFunction, Request, Response } from "express";
import { ForbiddenError, UnauthorizedError } from "../utils/error";
import { AuthenticateRequest } from "../types/auth";
import { verifyToken } from "../utils/jwt";
import type { Role } from "@prisma/client";

export function requireAuth(
  request: Request,
  _response: Response,
  next: NextFunction,
) {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      throw new UnauthorizedError();
    }

    const token = authHeader.replace("Bearer ", "");
    (request as AuthenticateRequest).user = verifyToken(token);
    next();
  } catch {
    next(new UnauthorizedError());
  }
}

export function requireRole(roles: Role[]) {
  return (request: Request, _response: Response, next: NextFunction) => {
    const authRequest = request as AuthenticateRequest;

    if (!authRequest.user) {
      next(new UnauthorizedError());
      return;
    }

    if (!roles.includes(authRequest.user.role)) {
      next(new ForbiddenError());
      return;
    }
    next();
  };
}
