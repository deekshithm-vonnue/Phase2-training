import type { Request, Response } from "express";
import { AuthService } from "./auth.services";
import { LoginInput, RegisterInput } from "./auth.schemas";
import { AuthenticateRequest } from "../../types/auth";

const authService = new AuthService();

export class AuthController {
  async register(request: Request, response: Response) {
    const result = await authService.register(request.body as RegisterInput);
    response.status(201).json({ data: result });
  }

  async login(request: Request, response: Response) {
    const result = await authService.login(request.body as LoginInput);
    response.json({ data: result });
  }

  async me(request: Request, response: Response) {
    const authRequest = request as AuthenticateRequest;
    const user = await authService.getCurrentUser(
      Number(authRequest.user?.userId),
    );
    response.json({ data: user });
  }
}

export const authController = new AuthController();
