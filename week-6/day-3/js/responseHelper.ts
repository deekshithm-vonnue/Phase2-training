import { ServerResponse } from "node:http";

export const sendResponse = {
  sucess: (res: ServerResponse, data: any, statusCode = 200): void => {
    res.statusCode = statusCode;
    res.setHeader("content-Type", "application/json");
    res.end(JSON.stringify(data));
  },

  error: (
    res: ServerResponse,
    message = "Internal server Error",
    statusCode = 500,
  ): void => {
    res.statusCode = statusCode;
    res.setHeader("content-Type", "application/json");

    res.end(JSON.stringify({ error: message }));
  },
};
