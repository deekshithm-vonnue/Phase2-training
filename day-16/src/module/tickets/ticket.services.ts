import { Prisma, Role, TicketPriority, TicketStatus } from "@prisma/client";
import { TicketRepository } from "./ticket.repository.ts";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from "../../utils/error.ts";
import { CreateTicketInput, ListTicketsInput } from "./ticket.schemas.ts";
import { AuthUser } from "../../types/auth.ts";

const repository = new TicketRepository();

function canViewTicket(user: AuthUser, ticket: Prisma.TicketGetPayload<{}>) {
  if (user.role === Role.ADMIN ) {
    return true;
  }
  
  if(user.role === Role.AGENT){
   return ticket.assignedToId === Number(user.userId);
  }
  return ticket.createdById === Number(user.userId);
}

function canAssignTicket(user: AuthUser) {
  return user.role === Role.ADMIN || user.role === Role.AGENT;
}

export class TicketService {
  async createTicket(currentUser: AuthUser, input: CreateTicketInput) {
    let assignedToId: number | null = null;

    if (input.assignedToId) {
      if (!canAssignTicket(currentUser)) {
        throw new ForbiddenError("You are not allowed to assign tickets");
      }

      const numericAssigneeId = Number(input.assignedToId);
      const assignee =
        await repository.findAssignableUserById(numericAssigneeId);

      if (
        !assignee ||
        (assignee.role !== Role.AGENT && assignee.role !== Role.ADMIN)
      ) {
        throw new BadRequestError(
          "INVALID_ASSIGNEE",
          "Assigned user must be an admin or agent",
        );
      }

      if (
        currentUser.role === Role.AGENT &&
        assignee.id !== Number(currentUser.userId)
      ) {
        throw new ForbiddenError(
          "Agents can only assign tickets to themselves",
        );
      }

      assignedToId = assignee.id;
    }

    return repository.createTicket({
      title: input.title,
      description: input.description,
      priority: input.priority,
      createdById: Number(currentUser.userId),
      assignedToId: assignedToId,
    });
  }

  async getTicketById(currentUser: AuthUser, id: number) {
    const result = await repository.findById(id);

    if (!result) {
      throw new NotFoundError("TICKET_NOT_FOUND", "Ticket not found");
    }

    if (!canViewTicket(currentUser, result)) {
      throw new ForbiddenError("You are not allowed to view this ticket");
    }
    return result;
  }

  async deleteTicket(currentUser: AuthUser, id: number) {
    const ticket = await repository.findById(id);
    if (!ticket) {
      throw new NotFoundError("TICKET_NOT_FOUND", "Ticket not found");
    }

    if (!canViewTicket(currentUser, ticket)) {
      throw new ForbiddenError("You are not allowed to delete this ticket");
    }

    return repository.delete(id);
  }

  async list(currentUser: AuthUser, input: ListTicketsInput) {
    const filter: Partial<{
      status: TicketStatus;
      priority: TicketPriority;
      assignedToId: number;
      createdById: number;
    }> = {};

    if (input.status) {
      filter.status = input.status;
    }

    if (input.priority) {
      filter.priority = input.priority;
    }

    if (currentUser.role === Role.USER) {
      filter.createdById = Number(currentUser.userId);
    } else {
      if (input.assignedToId) {
        filter.assignedToId = input.assignedToId;
      }
      if (input.createdById) {
        filter.createdById = Number(input.createdById);
      }
    }

    const result = await repository.findMany(filter);

    return result;
  }
}
