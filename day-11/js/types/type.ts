export const STATUSES = ["open","working", "closed"];
export const PRIORITIES = ["high", "medium", "low"];

type Status = (typeof STATUSES)[number];
export type Priority = (typeof PRIORITIES)[number];
export interface Ticket {
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  categoryId: number;
  customerId: number;
}
