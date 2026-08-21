export const STATUSES = ["pending", "closed"];
export const PRIORITIES = ["high", "medium", "low"];

type Status = (typeof STATUSES)[number];
export type Priority = (typeof PRIORITIES)[number];
export interface Ticket {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  assignee: string | null;
}
