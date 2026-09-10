import { useState } from "react";
import { Badge } from "./Badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../styles/issue.css";
import "../styles/project.css"
import type { LabelType } from "./Form";
import { useNavigate } from "react-router-dom";

export type StatusType = "Pending" | "In_Progress" | "Completed";

export interface IssueProps {
  title: string;
  description: string;
  priority?: "High" | "Low" | "Medium" | "Urgent";
  status?: StatusType;
  dueDate?: Date;
  assignedTo?: string;
  label?: LabelType;
}

interface CardComponentProps extends IssueProps {
  id: string | number;
  onEditClick: (id: string | number) => void;
}

export default function IssueCard({
  id,
  title,
  description,
  priority = "Medium",
  status = "Pending",
  dueDate,
  assignedTo = "Unassigned",
  onEditClick,
}: CardComponentProps) {
  const [currentStatus, setCurrentStatus] = useState<StatusType>(status);
  const navigate = useNavigate();

  const handleDetails = () => {
    navigate(`/issues/${id}`);
  };
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
        <button className="edit" onClick={() => onEditClick(id)}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
        <button className="delete">
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>

      <div className="issue-card-body" >
        <p className="issue-card-description" onClick={handleDetails}>
          {description || "No description provided."}
        </p>

        <div className="issue-card-assignee" onClick={handleDetails}>
          <span>Assigned To</span>
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
