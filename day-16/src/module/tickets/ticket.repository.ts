import { prisma } from "../../db/prisma";
import { Prisma, TicketPriority } from "@prisma/client";
import { TicketStatus } from "@prisma/client";
import { AppError } from "../../utils/error";
import { SortDirection, SortField } from "../../types/type";

type TicketFilters = {
  status?: TicketStatus;
  priority?: TicketPriority;
  assignedToId?: number;
  createdById?: number;
};
export class TicketRepository {
  async createTicket(data: Prisma.TicketUncheckedCreateInput) {
    return await prisma.ticket.create({
      data,
    });
  }
  async findById(id: number) {
    return prisma.ticket.findUnique({
      where: { id: id },
    });
  }

  async delete(id: number) {
    return await prisma.ticket.delete({
      where: { id: id },
    });
  }
  async findMany(filters: TicketFilters) {
    const where: Prisma.TicketWhereInput = {
      ...(filters.status ? { status: filters.status } : {}),
      ...(filters.priority ? { priority: filters.priority } : {}),
      ...(filters.assignedToId ? { assignedToId: filters.assignedToId } : {}),
      ...(filters.createdById ? { createdById: filters.createdById } : {}),
    };

    return await prisma.ticket.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
    });
  }

    async findAssignableUserById(id: number) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        role: true,
        name: true,
        email: true
      }
    });
  }
}
