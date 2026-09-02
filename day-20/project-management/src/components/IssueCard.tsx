import { useState } from "react";
import { Badge } from "./Badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Avatar } from "./Avatar";
import "../styles/issue.css";

export type StatusType = "Pending" | "In_Progress" | "Completed";

interface IssueProps {
  title: string;
  description: string;
  priority?: "High" | "Low" | "Medium" | "Urgent";
  status?: StatusType;
  dueDate?: Date;
  assignedTo?: string;
}

export default function IssueCard({
  title,
  description,
  priority = "Medium",
  status = "Pending",
  dueDate,
  assignedTo = "Unassigned",
}: IssueProps) {
  const [currentStatus, setCurrentStatus] = useState<StatusType>(status);

  const handleUpdateStatus = () => {
    if (currentStatus === "Pending") {
      setCurrentStatus("In_Progress");
    } else if (currentStatus === "In_Progress") {
      setCurrentStatus("Completed");
    } else {
      setCurrentStatus("Pending");
    }
  };

  // const [today] = useState(() => new Date());
  const today = new Date();

  return (
    <div className="issue-card">
      <div className="issue-card-header">
        <div className="issue-title">{title || "Issue Title"}</div>
        {today > dueDate! && currentStatus !== "Completed" && (
          <Badge text={"Overdue"} variant={"urgent".toLowerCase()} />
        )}
        <Badge text={priority} variant={priority.toLowerCase()} />
        <button className="edit" aria-label="Edit issue">
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
        <button className="delete" aria-label="Delete issue">
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>

      <div className="issue-card-body">
        <p className="issue-card-description">
          {description || "No description provided."}
        </p>

        <div className="issue-card-assignee">
          <span>Assigned To</span>
          <Avatar src="" name={assignedTo} />
          <span className="assignee-name">{assignedTo}</span>
        </div>

        <div className="issue-card-footer-group">
          <div className="issue-card-meta">
            <div className="issue-card-date">
              <span className="issue-card-date-label">DUE Date </span>
              <span className="issue-card-date-value">
                {dueDate ? dueDate.toLocaleDateString() : "TBD"}
              </span>
            </div>
            <div className="issue-card-status">
              <span className="issue-card-status-label">Status</span>
              <span
                className={`issue-card-status-value issue-card-status-value-${currentStatus.toLowerCase()}`}
              >
                {currentStatus.replace("_", " ")}
              </span>
            </div>
          </div>

          <button className="btn-update" onClick={handleUpdateStatus}>
            update status
          </button>
        </div>
      </div>
    </div>
  );
}
