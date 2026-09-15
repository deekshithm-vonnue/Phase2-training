import type { Issue} from "../types/project";
import { apiRequest } from "./apiClient";

export const issueApi = {
  getAll: async () => {
    const response = await apiRequest<Record<string, Issue[]>>(
      "api/issues",
      "GET",
    );
    return response.data;
  },
};
