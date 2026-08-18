import pool from "./db.ts";
import { readTickets, saveTicket } from "./storage.ts";
import { AppError } from "./types/appError.ts";
import { type Ticket, PRIORITIES, STATUSES } from "./types/type.ts";

export async function getTicketById(id: Number): Promise<Ticket | undefined> {
  const query = {
    text: "SELECT * FROM ticket.tickets WHERE id=$1",
    values: [id],
  };
  const result = await pool.query(query);
  return result.rows[0];
}

export async function deleteTicket(id: Number): Promise<void> {
  const query = {
    text: "DELETE FROM ticket.tickets WHERE id=$1 RETURNING *",
    values: [id],
  };
  const deletedTicket = await pool.query(query);
  if (!deletedTicket) throw new AppError("Deletion failed", 400);
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
    errors.push("status field is missing or invalid");
  }
  if (errors.length > 0) {
    throw new AppError(errors.join(", "), 400);
  }
}

export async function addTicket(ticket: Ticket): Promise<void> {
  const query = {
    text: "INSERT INTO ticket.tickets(title,description,priority,status,customer_id,category_id) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
    values: [
      ticket.title,
      ticket.description,
      ticket.priority,
      ticket.status,
      ticket.customerId,
      ticket.categoryId,
    ],
  };
   const result = await pool.query(query);
  if (!result.rows[0]) {
    throw new AppError("Adding to ticket failed", 400);
  }
  return result.rows[0];
}

export async function assignee(id: Number, userId: Number) {
  const query = {
    text: "INSERT INTO ticket.assignments(ticket_id,user_id) VALUES($1,$2) RETURNING *",
    values: [id, userId],
  };
  const result = await pool.query(query);
  if (!result.rows[0]) {
    throw new AppError("Assigning assignee failed", 400);
  }
}

export async function updateStatus(
  id: Number,
  ticket: Pick<Ticket, "status">,
): Promise<void> {
  if (typeof ticket.status !== "string" || !STATUSES.includes(ticket.status)) {
    throw new AppError("status field is missing or invalid", 401);
  }
  const query = {
    text: "UPDATE ticket.tickets set status=$1 where id=$2 RETURNING*",
    values: [ticket.status, id],
  };

  const updatedTicket = await pool.query(query);
  if (!updatedTicket.rows[0]) throw new AppError("Update failed", 401);
}
