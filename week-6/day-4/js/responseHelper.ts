import type { Response } from "express";

export const sendResponse = {
  sucess: (res: Response, data: any, statusCode = 200): void => {
    res.statusCode = statusCode;
    res.setHeader("content-Type", "application/json");
    res.send(JSON.stringify(data));
  },

  error: (
    res: Response,
    message = "Internal server Error",
    statusCode = 500,
  ): void => {
    res.statusCode = statusCode;
    res.setHeader("content-Type", "application/json");

    res.send(JSON.stringify({ error: message }));
  },
};
