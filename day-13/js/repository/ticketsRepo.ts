import { prisma } from "../../lib/prisma";
import { Prisma } from "../../generated/prisma/client";
import { status } from "../../generated/prisma/enums";
import { AppError } from "../types/appError";
import { SortDirection, SortField, Ticket } from "../types/type";
export class TicketRepository {
  async findById(id: number) {
    try {
      return prisma.tickets.findUnique({
        where: { id: id },
      });
    } catch (error) {
      throw new AppError("Ticket not found or update failed", 404);
    }
  }

  async findTickets() {
    return prisma.tickets.findMany();
  }

  async findAndUpdateStatus(id: number, status: status) {
    try {
      return await prisma.tickets.update({
        where: { id: id },
        data: { status: status },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          return null;
        }
      }
      throw error;
    }
  }

  async findAndDelete(id: number) {
    return await prisma.tickets.delete({
      where: { id: id },
    });
  }

  async createAssigne(id: number, userId: number) {
    return await prisma.assignments.create({
      data: {
        ticket_id: id,
        user_id: userId,
      },
    });
  }

  async createTicket(ticket: Ticket) {
    return await prisma.tickets.create({
      data: {
        title: ticket.title,
        description: ticket.description,
        priority: ticket.priority,
        customer_id: ticket.customerId,
        category_id: ticket.categoryId,
        status: ticket.status,
      },
    });
  }

  async count(where: Prisma.ticketsWhereInput): Promise<number> {
    return prisma.tickets.count({ where });
  }

  async filterMany(
    where: Prisma.ticketsWhereInput,
    skip: number,
    take: number,
    sortField: SortField,
    sortDirection: SortDirection,
  ) {
    return prisma.tickets.findMany({
      where,
      skip,
      take,
      orderBy: {
        [sortField]: sortDirection,
      },
      include: {
        assignments: true,
      },
    });
  }
}
