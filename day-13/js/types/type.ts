export const STATUSES = ["open", "working", "close"] as const;
export const PRIORITIES = ["high", "medium", "low"] as const;

export type Status = (typeof STATUSES)[number];
export type Priority = (typeof PRIORITIES)[number];
export interface Ticket {
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  categoryId: number;
  customerId: number;
}

export const allowedSortFields = [
  "id",
  "title",
  "status",
  "priority",
  "createdAt",
];

export type SortField = (typeof allowedSortFields)[number];
export type SortDirection = "asc" | "desc";

export interface TicketQuery {
  page: number;
  pageSize: number;
  status?: Status;
  priority?: Priority;
  assignee?: number;
  search?: string;
  sortField: SortField;
  sortDirection: SortDirection;
}
