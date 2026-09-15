import { env } from "../config/env";
import type { AuthUser } from "../types/auth";
import jwt from "jsonwebtoken";

export type JwtPayload = AuthUser & jwt.JwtPayload;

export function signToken(payload: { userId: string }): string {
  return jwt.sign(payload, env.JWT_SECERT, {
    expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
  });
}

export function verifyToken(token: string): AuthUser {
  const decoded = jwt.verify(token, env.JWT_SECERT) as JwtPayload;

  return {
    userId: decoded.userId,
  };
}
