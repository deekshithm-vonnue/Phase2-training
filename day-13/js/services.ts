import { error } from "node:console";
import { prisma } from "../lib/prisma.ts";
import { Prisma } from "../generated/prisma/client.ts";
import pool from "./db.ts";
import { TicketRepository } from "./repository/ticketsRepo.ts";
import { readTickets, saveTicket } from "./storage.ts";
import { AppError } from "./types/appError.ts";
import {
  type Ticket,
  PRIORITIES,
  STATUSES,
  TicketQuery,
} from "./types/type.ts";

const ticketConnect = new TicketRepository();
export async function getTicketById(id: number) {
  const result = await ticketConnect.findById(id);

  return result;
}

export async function deleteTicket(id: number): Promise<void> {
  try {
    const deletedTicket = await ticketConnect.findAndDelete(id);
  } catch (error) {
    throw new AppError("Deletion failed", 400);
  }
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

export async function addTicket(ticket: Ticket) {
  try {
    const result = await ticketConnect.createTicket(ticket);
    return result;
  } catch {
    throw new AppError("Adding to ticket failed", 400);
  }
}

export async function assignee(id: number, userId: number) {
  try {
    await ticketConnect.createAssigne(id, userId);
  } catch (error) {
    throw new AppError("Assigning assignee failed", 400);
  }
}

export async function updateStatus(
  id: number,
  ticket: Pick<Ticket, "status">,
): Promise<void> {
  try {
    if (
      typeof ticket.status !== "string" ||
      !STATUSES.includes(ticket.status)
    ) {
      throw new AppError("status field is missing or invalid", 400);
    }
    await ticketConnect.findAndUpdateStatus(id, ticket.status);
  } catch (error) {
    throw new AppError("Ticket not found or update failed", 404);
  }
}

export const getTicketsFilter = async (query: TicketQuery) => {
  const {
    page,
    pageSize,
    status,
    priority,
    assignee,
    search,
    sortField,
    sortDirection,
  } = query;

  const skip = (page - 1) * pageSize;
  const where: Prisma.ticketsWhereInput = {};

  if (status) {
    where.status = status;
  }

  if (priority) {
    where.priority = priority;
  }

  if (assignee) {
    where.assignments = {
      some: {
        user_id: assignee,
      },
    };
  }

  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }
  const take = pageSize;
  const [total, tickets] = await Promise.all([
    ticketConnect.count(where),
    ticketConnect.filterMany({where, skip, take, sortField, sortDirection}),
  ]);

  const totalPages = Math.ceil(total / pageSize);

  return {
    data: tickets,
    pagination: {
      page,
      pageSize,
      total,
      totalPages,
    },
  };
};
