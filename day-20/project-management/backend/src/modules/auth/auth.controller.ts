import type { Request, Response } from "express";
import type { LoginInput, RegisterInput } from "./auth.schema";
import type { AuthenticateUser } from "../../types/auth";
import { AuthService } from "./auth.service";

export const authService = new AuthService();

export class AuthController {
  async register(request: Request, response: Response) {
    console.log("heel")
    const result = await authService.register(request.body as RegisterInput);
    response.status(201).json({ data: result });
  }

  async login(request: Request, response: Response) {
    const result = await authService.login(request.body as LoginInput);
    response.json({ data: result });
  }

  async me(request: Request, response: Response) {
    console.log("hdf")
    const authRequest = request as AuthenticateUser;
    const user = await authService.getCurrentUser(authRequest.user!.userId);
    response.json({ data: user });
  }
}

export const authController = new AuthController();
