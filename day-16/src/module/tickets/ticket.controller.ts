import type { Request, Response, NextFunction } from "express";

import { TicketRepository } from "./ticket.repository.ts";
import { TicketQuery } from "../../types/type.ts";
import { TicketService } from "./ticket.services.ts";
import { AuthenticateRequest } from "../../types/auth.ts";
import { CreateTicketInput, ListTicketsInput } from "./ticket.schemas.ts";

const repository = new TicketRepository();

const ticketService = new TicketService();

function authUser(request: Request) {
  return (request as AuthenticateRequest).user!;
}

export class TicketController {
  async create(request: Request, response: Response) {
    const ticket = await ticketService.createTicket(
      authUser(request),
      request.body as CreateTicketInput,
    );
    response.status(201).json({ data: ticket });
  }

  async list(request: Request, response: Response) {
    const result = await ticketService.list(
      authUser(request),
      request.query as unknown as ListTicketsInput,
    );
    response.json(result);
  }

  async getById(request: Request, response: Response) {
    const ticket = await ticketService.getTicketById(
      authUser(request),
      Number(request.params.id),
    );
    response.json({ data: ticket });
  }

    async delete(request: Request, response: Response) {
    const ticket = await ticketService.deleteTicket(
      authUser(request),
      Number(request.params.id)
    );
    response.json({ data: ticket });
  }
}

export const ticketController = new TicketController();