import pool from "./db.ts";
import { readTickets, saveTicket } from "./storage.ts";
import { AppError } from "./types/appError.ts";
import { type Ticket, PRIORITIES, STATUSES } from "./types/type.ts";

export async function getTicketById(id: string): Promise<Ticket | undefined> {
  const query = {
    text: "SELECT * FROM ticket.tickets WHERE id=$1",
    values: [id],
  };
  const result = await pool.query(query);
  return result.rows[0];
}

export async function deleteTicket(id: string): Promise<void> {
  const query = {
    text: "DELETE FROM ticket.tickets WHERE id=$1 RETURNING *",
    values: [id],
  };
  const deletedTask = await pool.query(query);
  if (!deletedTask) throw new AppError("Deletion failed", 400);
}

export function validateTicket(ticket: Ticket) {
  const errors: string[] = [];
  if (typeof ticket.title !== "string" || ticket.title.trim() === "") {
    errors.push("Title field is missing");
  }
  if (
    typeof ticket.description !== "string" ||
    ticket.description.trim() === ""
  ) {
    errors.push("description field is missing");
  }
  if (
    typeof ticket.priority !== "string" ||
    !PRIORITIES.includes(ticket.priority)
  ) {
    errors.push("priority field is missing or invalid");
  }
  if (typeof ticket.status !== "string" || !STATUSES.includes(ticket.status)) {
    errors.push("description field is missing");
  }
  if (errors.length > 0) {
    throw new AppError(errors.join(", "), 400);
  }
}

export async function addTicket(ticket: Ticket): Promise<void> {
  const query = {
    text: "INSERT INTO support_tickets.users(title",
  };
  ticket.id = crypto.randomUUID();
  ticket.assignee = "none";
  const tasks = await readTickets();
  tasks.push(ticket);
  saveTicket(tasks);
}

export async function updateAssigneeOrStatusOrBoth(
  id: string,
  ticket: Partial<Pick<Ticket, "assignee" | "status">>,
) {
  if (ticket.assignee !== undefined) {
    if (typeof ticket.assignee !== "string" || ticket.assignee.trim() === "") {
      throw new AppError("Assignee field is missing or invalid", 401);
    }
  }

  if (ticket.status !== undefined) {
    if (
      typeof ticket.status !== "string" ||
      !STATUSES.includes(ticket.status)
    ) {
      throw new AppError("status field is missing or invalid", 401);
    }
  }

  if (ticket.assignee === undefined && ticket.status === undefined) {
    throw new AppError("Please provide an assignee or a status to update", 400);
  }
  const tasks = await readTickets();
  const task = tasks.find((task) => task.id === id);
  if (task) {
    if (ticket.assignee !== undefined) task.assignee = ticket.assignee;
    if (ticket.status !== undefined) task.status = ticket.status;
    let index = tasks.indexOf(task);
    tasks[index] = task;
    await saveTicket(tasks);
  } else {
    throw new AppError("Task not found", 400);
  }
}
