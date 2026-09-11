const BASE_URL = import.meta.env.VITE_BASE_URL;

export const apiRequest = async <T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  options?: Omit<RequestInit, "method" | "headers" | "body">,
  data?: unknown,
): Promise<T> => {
  const fullUrl = new URL(url, BASE_URL).href;

  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  const headers: Record<string, string> = {
    "content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const config: RequestInit = {
    method,
    headers,
    ...options,
  };

  if (data !== undefined && method !== "GET") {
    config.body = JSON.stringify(data);
  }

  const response = await fetch(fullUrl, config);

  if (!response.ok) {
    throw new Error(`HTTP error status: ${response.status}`);
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json() as Promise<T>;
};
