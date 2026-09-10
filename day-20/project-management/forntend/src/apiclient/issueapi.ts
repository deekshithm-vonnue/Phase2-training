import type { Issue } from "../types/project";
import { apiRequest } from "./apiClient";

export const issueApi = {
  getAll: async (
    options?: Omit<RequestInit, "headers" | "body" | "method">,
  ) => {
    const response = await apiRequest<Record<string, Issue[]>>(
      "api/issues",
      "GET",
      options,
    );
    return response.data;
  },

  getById: async (
    issueId: string,
    options?: Omit<RequestInit, "method" | "headers" | "body">,
  ) => {
    const response = await apiRequest<Record<string, Issue>>(
      `api/issues/${issueId}`,
      "GET",
      options,
    );
    return response.data;
  },
};
