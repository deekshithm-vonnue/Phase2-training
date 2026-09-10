const BASE_URL = import.meta.env.VITE_BASE_URL;

export const apiRequest = async <T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  options?: Omit<RequestInit, "method" | "headers" | "body">,
  data?: unknown,
): Promise<T> => {
  const fullUrl = new URL(url, BASE_URL).href;

  const config: RequestInit = {
    method,
    headers: {
      "content-Type": "application/json",
    },
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
