import type { Project } from "../types/project";
import { apiRequest } from "./apiClient";

export const projectApi = {
  getAll: async () => {
    const data = await apiRequest<Record<string, Project[]>>(
      "api/projects",
      "GET",
    );
    return data.data;
  },
};
