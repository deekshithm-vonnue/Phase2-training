import type { NextFunction, Request, Response } from "express";
import { ToManyRequestError } from "../utils/error";

const requestCounts: Record<string, number[]> = {};

export const rateLimter =
  () => (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.socket.remoteAddress || "unknown";
    const now = Date.now();
    const timeLimit = 15 * 60 * 1000;
    const maxCalls = 200;
    if (!requestCounts[ip]) {
      requestCounts[ip] = [];
    }
    requestCounts[ip] = requestCounts[ip].filter(
      (request) => now - request < timeLimit,
    );

    if (requestCounts[ip].length >= maxCalls) {
      return next(new ToManyRequestError());
    }
    requestCounts[ip].push(now);
    next();
  };
