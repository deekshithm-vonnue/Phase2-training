import { Router } from "express";
import { validate } from "../../middleware/validation.middleware";
import { loginSchema, registerSchema } from "./auth.schemas";
import { authController } from "./auth.controller";
import { requireAuth } from "../../middleware/auth.middleware";

export const authRoutes = Router();

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     summary: Register a new end user account
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password, name]
 *             properties:
 *               email: {type: string, format: email}
 *               password: {type: string}
 *               name: {type: string}
 *     responses:
 *       201:
 *         description: User created
 */

authRoutes.post(
  "/register",
  validate({ body: registerSchema }),
  (req, res, next) => {
    authController.register(req, res).catch(next);
  },
);

/**
 * @openapi
 *  /api/auth/login:
 *  post:
 *   summary: Log in and receive a JWT
 *   tags: [Authentication]
 *   requestBody:
 *    required: true
 *    content:
 *      application/json:
 *        schema:
 *          type: object
 *          required: [email, password]
 *          properties:
 *            email: {type: string, format: email}
 *            password: {type: string}
 *    responses:
 *      200:
 *        description: Login successfull
 */
authRoutes.post("/login", validate({ body: loginSchema }), (req, res, next) => {
  authController.login(req, res).catch(next);
});

/**
 * @openapi
 *  /api/auth/me:
 *    get:
 *      summary: Get the currently authenticated user
 *      tags: [Authentication]
 *      security:
 *        - beaterAuth: []
 *      responses:
 *        200:
 *          description: Current user profile
 *
 */
authRoutes.get("/me", requireAuth, (req, res, next) => {
  authController.me(req, res).catch(next);
});
