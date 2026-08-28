import { prisma } from "../../db/prisma";
import { Prisma } from "@prisma/client";
import { TicketStatus } from "@prisma/client";
import { AppError } from "../../utils/error";
import { SortDirection, SortField } from "../../types/type";

interface FilterTicketsParams {
  where: Prisma.TicketWhereInput;
  skip: number;
  take: number;
  sortField: SortField;
  sortDirection: SortDirection;
}

export class TicketRepository {
  async findById(id: number) {
    try {
      return prisma.ticket.findUnique({
        where: { id: id },
      });
    } catch (error) {
      throw new AppError("Ticket not found or update failed", 404);
    }
  }

  async findTickets() {
    return prisma.ticket.findMany();
  }

  async findAndUpdateStatus(id: number, status: TicketStatus) {
    try {
      return await prisma.ticket.update({
        where: { id: id },
        data: { status: status },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw error;
        }
      }
      throw error;
    }
  }

  async findAndDelete(id: number) {
    return await prisma.ticket.delete({
      where: { id: id },
    });
  }

  async createAssigne(id: number, userId: number) {
    return await prisma.assignment.create({
      data: {
        ticket_id: id,
        user_id: userId,
      },
    });
  }

  async createTicket(data: Prisma.TicketUncheckedCreateInput) {
    return await prisma.ticket.create({
      data,
    });
  }

  async count(where: Prisma.TicketWhereInput): Promise<number> {
    return prisma.ticket.count({ where });
  }

  async filterMany({
    where,
    skip,
    take,
    sortField,
    sortDirection,
  }: FilterTicketsParams) {
    return prisma.ticket.findMany({
      where,
      skip,
      take,
      orderBy: {
        [sortField]: sortDirection,
      } as Prisma.TicketOrderByWithRelationInput,
      include: {
        assignments: true,
      },
    });
  }
}
