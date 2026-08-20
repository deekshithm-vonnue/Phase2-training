import { Prisma } from "@prisma/client";
import ticketRepository from "../repositories/ticket.repository";
import { TicketQuery } from "../types/ticket";

const getTickets = async (query: TicketQuery) => {
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
  const where: Prisma.TicketWhereInput = {};

  if (status) {
    where.status = status; // Securely type-mapped to your exact Prisma DB enum values
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

  const [total, tickets] = await Promise.all([
    ticketRepository.count(where),
    ticketRepository.findMany({
      where,
      skip,
      take: pageSize,
      sortField,
      sortDirection,
    }),
  ]);

  const totalPages = Math.ceil(total / pageSize);

  return {
    data: tickets,
    pagination: {
      page,
      pageSize,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };
};

export default { getTickets };
