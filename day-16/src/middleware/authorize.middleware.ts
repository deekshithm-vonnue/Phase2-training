import { NextFunction, Request, Response } from "express";
import {
  Action,
  Permission,
  Resource,
  ROLE_PERMISSIONS,
} from "../utils/permission";
import { AuthenticateRequest } from "../types/auth";
import { ForbiddenError, UnauthorizedError } from "../utils/error";

export function authorize(resource: Resource, action: Action) {
  return (request: Request, response: Response, next: NextFunction) => {
    const CURRENTUSER = (request as AuthenticateRequest).user;
    if (!CURRENTUSER) {
      throw new UnauthorizedError();
    }

    const userRole = CURRENTUSER.role as keyof typeof ROLE_PERMISSIONS;
    const assignedPermission = ROLE_PERMISSIONS[
      userRole
    ] as readonly Permission[];

    const targetPermission: Permission = `${resource}:${action}`;
    const ownershipPermission: Permission = `${resource}:own`;
    if (assignedPermission.includes(targetPermission)) {
      return next();
    }

    if (assignedPermission.includes(ownershipPermission)) {
      return next();
    }

    return next(new ForbiddenError("You do not have permission to execute this action"));
  };
}
