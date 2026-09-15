import { Badge } from "./Badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "../styles/project.css"
type StatusType = "Pending" | "In_Progress" | "Completed";
interface ProjectProps {
  title: string;
  description: string;
  priority?: "High" | "Low" | "Medium" | "Urgent";
  status?: StatusType;
  dueDate?: Date;
}
export default function ProjectCard({
  title,
  description,
  priority ="Medium",
  status = "Pending",
  dueDate,
}: ProjectProps) {
  const [currentStatus, setCurrentStatus] = useState<StatusType>(status);

  const handleUpdateStatus = () => {
    if (currentStatus == "Pending") {
      setCurrentStatus("In_Progress");
    } else if (currentStatus === "In_Progress") {
      setCurrentStatus("Completed");
    } else {
      setCurrentStatus("Pending");
    }
  };

  return (
    <div className="project-card">
      <div className="project-card-header">
        <div className="project-title">{title || "Project Title"}</div>
        <Badge
          text={priority || "Medium"}
          variant={priority?.toLowerCase() || "info"}
        />
        <button className="edit">
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
        <div className="delete">
          <FontAwesomeIcon icon={faTrash} />
        </div>
      </div>
      <div className="project-card-body">
        <p className="project-card-description">
          {description || "No description"}
        </p>
        <div className="project-card-meta">
          <div className="project-card-date">
            <span className="project-card-date-label">Due </span>
            <span className="project-card-date-value">
              {dueDate ? dueDate.toLocaleDateString() : "TBD"}
            </span>
          </div>
          <div className="project-card-status">
            <span className="project-card-status-label">Status </span>
            <span className={`project-card-status-value project-card-status-value-${currentStatus.toLowerCase()}`}>{currentStatus}</span>
          </div>
        </div>
      </div>
      <button className="btn-update" onClick={handleUpdateStatus}>
        update status
      </button>
    </div>
  );
}
