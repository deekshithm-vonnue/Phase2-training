import type { Request, Response, NextFunction } from "express";
import {
  allowedSortFields,
  PRIORITIES,
  Priority,
  SortDirection,
  SortField,
  Status,
  STATUSES,
  TicketQuery,
} from "../types/type";

export const validateTicketQuery = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {
    page = "1",
    pageSize = "10",
    status,
    priority,
    assignee,
    search,
    sortField = "id", 
    sortDirection = "desc",
  } = req.query;

  const pageNumber = Number(page);
  const PageSizeNumber = Number(pageSize);

  if (!Number.isInteger(pageNumber) || pageNumber < 1) {
    return res.status(400).json({ success: false, message: "Page must be a positive integer" });
  }

  if (!Number.isInteger(PageSizeNumber) || PageSizeNumber < 1) {
    return res.status(400).json({ success: false, message: "Page size must be a positive integer" });
  }

  if (status !== undefined && !STATUSES.includes(status as Status)) {
    return res.status(400).json({
      success: false,
      message: `Status must be one of: ${STATUSES.join(", ")}`,
    });
  }


  if (priority !== undefined && !PRIORITIES.includes(priority as Priority)) {
    return res.status(400).json({
      success: false,
      message: `Priority must be one of: ${PRIORITIES.join(", ")}`,
    });
  }

  let assigneeNumber: number | undefined;
  if (assignee !== undefined) {
    assigneeNumber = Number(assignee);
    if (!Number.isInteger(assigneeNumber) || assigneeNumber < 1) {
      return res.status(400).json({ success: false, message: "Assignee must be a positive integer" });
    }
  }

  if (typeof sortField !== "string" || !allowedSortFields.includes(sortField as SortField)) {
    return res.status(400).json({ success: false, message: "Invalid sort field" });
  }

  if (sortDirection !== "asc" && sortDirection !== "desc") {
    return res.status(400).json({ success: false, message: "sortDirection must be 'asc' or 'desc'" });
  }

  const validatedQuery: TicketQuery = {
    page: pageNumber,
    pageSize: PageSizeNumber,
    status: status ? (status as Status) : undefined,    
    priority: priority ? (priority as Priority) : undefined, 
    assignee: assigneeNumber,
    search: typeof search === "string" ? search.trim() : undefined,
    sortField: sortField as SortField,
    sortDirection: sortDirection as SortDirection,
  };

  res.locals.ticketQuery = validatedQuery;
  next();
};

