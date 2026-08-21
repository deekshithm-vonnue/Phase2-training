export const STATUSES = ["open","working", "close"] as const ;
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
// export const STATUSES = ["open", "working", "close"] as const; 
// export const PRIORITIES = ["high", "medium", "low"] as const;

// export type Status = (typeof STATUSES)[number]; // "open" | "working" | "close"
// export type Priority = (typeof PRIORITIES)[number];

// export interface Ticket {
//   title: string;
//   description: string;
//   priority: Priority;
//   status: Status;
//   categoryId: number;
//   customerId: number;
// }
