import type { LabelType } from "../components/Form";

export interface Project {
  id: string;
  title: string;
  description: string;
  priority: "High" | "Low" | "Medium" | "Urgent";
  status: "Pending" | "In_Progress" | "Completed";
  dueDate: Date;
  createdAt: string;
}
export interface Issue {
  id: string;
  title: string;
  description: string;
  priority: "High" | "Low" | "Medium" | "Urgent";
  status: "Pending" | "In_Progress" | "Completed";
  dueDate: Date;
  projectId: string;
  assignedTo: string;
  label?: LabelType;
}
