import { readTickets, saveTicket } from "./storage.ts";
import { AppError } from "./types/appError.ts";
import { type Ticket, PRIORITIES, STATUSES } from "./types/type.ts";
export async function getTicketById(id: string): Promise<Ticket | undefined> {
  const tasks = await readTickets();
  return tasks.find((task) => task.id === id);
}

export async function deleteTicket(id: string): Promise<void> {
  const tasks = await readTickets();
  const updatedTasks = tasks.filter((task) => task.id !== id);
  if (updatedTasks.length === tasks.length)
    throw new AppError("Deletion failed", 400);
  saveTicket(updatedTasks);
}

export function validateTicket(ticket: Ticket) {
  if (typeof ticket.title !== "string" || ticket.title.trim() === "") {
    throw new AppError("Title field is missing", 401);
  }
  if (
    typeof ticket.description !== "string" ||
    ticket.description.trim() === ""
  ) {
    throw new AppError("description field is missing", 401);
  }
  if (
    typeof ticket.priority !== "string" ||
    !PRIORITIES.includes(ticket.priority)
  ) {
    throw new AppError("priority field is missing or invalid", 401);
  }
  if (typeof ticket.status !== "string" || !STATUSES.includes(ticket.status)) {
    throw new AppError("status field is missing or invalid", 401);
  }
}

export async function addTicket(ticket: Ticket): Promise<void> {
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
