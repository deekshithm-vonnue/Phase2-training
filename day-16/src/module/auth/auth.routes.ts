import { Router } from "express";
import { validate } from "../../middleware/validation.middleware";
import { loginSchema, registerSchema } from "./auth.schemas";
import { authController } from "./auth.controller";
import { requireAuth } from "../../middleware/auth.middleware";

export const authRoutes = Router();

authRoutes.post(
  "/register",
  validate({ body: registerSchema }),
  (req, res, next) => {
    authController.register(req, res).catch(next);
  },
);

authRoutes.post("/login", validate({ body: loginSchema }), (req, res, next) => {
  authController.login(req, res).catch(next);
});

authRoutes.get("/me", requireAuth, (req, res, next) => {
  authController.me(req, res).catch(next);
});
