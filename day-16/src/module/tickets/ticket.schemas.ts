import { TicketPriority, TicketStatus } from "@prisma/client";
import { title } from "node:process";
import { z } from "zod";
export const createTicketSchema = z.object({
  title: z.string().trim().min(3).max(120),
  description: z.string().trim().min(10).max(5000),
  priority: z.nativeEnum(TicketPriority).default(TicketPriority.MEDIUM),
  assignedToId: z.coerce.number().int().min(1).optional()
});

export const ticketIdParamSchema = z.object({
  id: z.coerce.number().int().min(1).max(1000)
});


export const listTicketsQuerySchema = z.object({
  status: z.nativeEnum(TicketStatus).optional(),
  priority: z.nativeEnum(TicketPriority).optional(),
  assignedToId: z.coerce.number().int().min(1).optional(),
  createdById: z.string().min(1).optional()
});

export type CreateTicketInput = z.infer<typeof createTicketSchema>;
export type ListTicketsInput = z.infer<typeof listTicketsQuerySchema>;
