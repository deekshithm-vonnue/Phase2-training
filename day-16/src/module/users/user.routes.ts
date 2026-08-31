import { Router } from "express";
import { requireAuth, requireRole } from "../../middleware/auth.middleware";
import { Role } from "@prisma/client";
import { validate } from "../../middleware/validation.middleware";
import { userListQuerySchema } from "./user.schemas";
import { userController } from "./user.controller";

export const userRoutes = Router();

/**
 * @openapi
 *  /api/users:
 *    get:
 *      summary: List users for assignment and administration
 *      tags: [Users]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          description: User list
 */

userRoutes.get(
  "/",
  requireAuth,
  requireRole([Role.ADMIN]),
  validate({ query: userListQuerySchema }),
  (req, res, next) => {
    userController.list(req, res).catch(next);
  },
);
