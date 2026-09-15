import { Router } from "express";
import { loginSchema, registerSchema } from "./auth.schema";
import { validation } from "../../middleware/validation.middleware";
import { authController } from "./auth.controller";
import { requireAuth } from "../../middleware/auth.middleware";

export const authRoutes = Router();

authRoutes.post(
  "/register",
  validation({ body: registerSchema }),
  (req, res, next) => {
    console.log("ehh");
    authController.register(req, res).catch(next);
  },
);

authRoutes.post(
  "/login",
  validation({ body: loginSchema }),
  (req, res, next) => {
    authController.login(req, res).catch(next);
  },
);

authRoutes.get("/me", requireAuth, (req, res, next) => {
  authController.me(req, res).catch(next);
});
