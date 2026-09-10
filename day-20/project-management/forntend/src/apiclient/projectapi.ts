import type { Project } from "../types/project";
import { apiRequest } from "./apiClient";

export const projectApi = {
  getAll: async (
    options?: Omit<RequestInit, "method" | "headers" | "body">,
  ) => {
    const data = await apiRequest<Record<string, Project[]>>(
      "api/projects",
      "GET",
      options,
    );
    return data.data;
  },

  getById: async (
    projectId: string,
    options?: Omit<RequestInit, "method" | "headers" | "body">,
  ) => {
    const data = await apiRequest<Record<string, Project>>(
      `api/projects/${projectId}`,
      "GET",
      options,
    );
    return data.data;
  },

  create: async (
    newProject: Omit<Project, "id">,
    options: Omit<RequestInit, "method" | "headers" | "body">,
  ) => {
    const data = await apiRequest<Record<string, Project>>(
      "api/projects",
      "POST",
      options,
      newProject,
    );
    return data.data;
  },
};
