import mockData from "../../mockdata.json";
import { EmptyState } from "../components/EmptyState";
import IssueCard, { type StatusType } from "../components/IssueCard";

interface RawMockIssue {
  id: string | number;
  title: string;
  description: string;
  priority?: string;
  status?: string;
  dueDate?: string | null;
  assignedTo?: string;
}

export default function RenderIssueList() {
  const validIssues = (mockData.issues as RawMockIssue[]).map((issue) => {
    return {
      id: issue.id,
      title: issue.title,
      description: issue.description,
      priority: issue.priority as "Urgent" | "High" | "Medium" | "Low",
      status: issue.status as StatusType,
      dueDate: issue.dueDate ? new Date(issue.dueDate) : undefined,
      assignedTo: issue.assignedTo ? issue.assignedTo : undefined,
    };
  });

  if (validIssues.length == 0) {
    return (
      <div className="issuePage">
        <EmptyState type="issues" />
      </div>
    );
  }

  return (
    <div className="issuePage">
      {" "}
      {validIssues.map((issue) => (
        <IssueCard
          key={issue.id}
          title={issue.title}
          description={issue.description}
          priority={issue.priority as "Urgent" | "High" | "Medium" | "Low"}
          status={issue.status as StatusType}
          dueDate={issue.dueDate ? new Date(issue.dueDate) : undefined}
          assignedTo={issue.assignedTo}
        />
      ))}
    </div>
  );
}
