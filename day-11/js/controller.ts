import type { Request, Response, NextFunction } from "express";
import { readTickets } from "./storage.ts";
import {
  addTicket,
  assignee,
  deleteTicket,
  getTicketById,
  updateStatus,
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
    console.log(error);
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
    await deleteTicket(Number(id));
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

    const data = await getTicketById(Number(id));
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
    const newTicket =await addTicket(body);
    res.status(201).json({status:"Success",newTicket});
  } catch (error) {
    next(error);
  }
}

export async function assigneeHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = req.params.id;
    const body = req.body;
    console.log("df")
    await assignee(Number(id), body.userId);
    res.status(200).send("Successfuly updated");
  } catch (error) {
    next(error);
  }
}
export async function updateStatusHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = req.params.id;
    const body = req.body;
    await updateStatus(Number(id), body);
    res.status(200).send("Successfuly updated");
  } catch (Error) {
    next(Error);
  }
}
