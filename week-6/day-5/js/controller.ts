import type { Request, Response, NextFunction } from "express";
import { readTickets } from "./storage.ts";

export async function getAllTickets(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = await readTickets();
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
}
