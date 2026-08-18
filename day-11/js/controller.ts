import type { Request, Response, NextFunction } from "express";
import { readTickets } from "./storage.ts";
import {
  addTicket,
  deleteTicket,
  getTicketById,
  updateAssigneeOrStatusOrBoth,
  validateTicket,
} from "./services.ts";
import { AppError } from "./types/appError.ts";
import pool from "./db.ts";

export async function getAllTickets(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = await pool.query("SELECT * FROM ticket.tickets ORDER by id;");

    res.status(200).json(data.rows);
  } catch (error) {
    console.log(error)
    next(error);
  }
}
export async function removeTicket(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = req.params.id;
    await deleteTicket(String(id));
    res.status(200).send("Task deleted successfully");
  } catch (error) {
    next(error);
  }
}

export async function getTicket(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = req.params.id;

    const data = await getTicketById(String(id));
    if (!data) throw new AppError("Task not found", 400);
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
}

export async function createTicket(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const body = req.body;
    validateTicket(body);
    await addTicket(body);
    res.status(201).send("Task created successfully");
  } catch (error) {
    next(error);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;
    const body = req.body;
    await updateAssigneeOrStatusOrBoth(String(id), body);
    res.status(200).send("Successfuly updated");
  } catch (error) {
    next(error);
  }
}
