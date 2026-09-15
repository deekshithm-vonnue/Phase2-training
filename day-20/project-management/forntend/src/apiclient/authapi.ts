import type { LoginResponse, User } from "../types/auth";
import { apiRequest } from "./apiClient";

export const authApi = {
  login: async (
    options?: Omit<RequestInit, "header" | "body" | "method">,
    data?: unknown,
  ) => {
    const response = await apiRequest<Record<string, LoginResponse>>(
      "api/auth/login",
      "POST",
      options,
      data,
    );
    return response.data;
  },

  register: async (
    options?: Omit<RequestInit, "header" | "body" | "method">,
    data?: unknown,
  ) => {
    const response = await apiRequest<Record<string, string>>(
      "api/auth/register",
      "POST",
      options,
      data,
    );

    return response.data;
  },

  me: async (options?: Omit<RequestInit, "header" | "body" | "method">) => {
    const response = await apiRequest<Record<string, User>>(
      "api/auth/me",
      "GET",
      options,
    );

    return response.data
  },
};
