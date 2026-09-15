import jwt from "jsonwebtoken";
import { AuthUser } from "../types/auth";
import { env } from "../config/env";
import { Role } from "@prisma/client";

type JwtPayload = AuthUser & jwt.JwtPayload;

export function signToken(payload: { userId: number; role: Role }): string {
  return jwt.sign(payload, env.JWT_SECRET as jwt.Secret, {
    expiresIn: env.JWT_EXPIRES_IN as unknown as NonNullable<
      jwt.SignOptions["expiresIn"]
    >,
  });
}


export function verifyToken(token: string):AuthUser {
    const decoded = jwt.verify(token,env.JWT_SECRET) as JwtPayload;

    return {
        userId: decoded.userId,
        role: decoded.role
    }
}