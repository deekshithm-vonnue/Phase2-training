import type { Role } from "@prisma/client";
import type { Request } from "express";

export type AuthUser = {
  userId: number;
  role: Role;
};

export type AuthenticateRequest = Request &{
    user?:AuthUser
}