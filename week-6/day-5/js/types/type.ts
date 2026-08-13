type Status = "pending" | "closed";
type Priority = "high" | "medium" | "low";
 interface Ticket {
  id: number;
  title: string;
  description:string
  priority: Priority;
  status: Status;
  assignee: string;
}
