import "../styles/emptystate.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons";
interface EmptyProps {
  type: "projects" | "issues";
}

export function EmptyState({ type }: EmptyProps) {
  return (
    <div className="empty-state">
      <span className="empty-state-icon">
        <FontAwesomeIcon icon={faRectangleXmark} />
      </span>
      <h3 className="empty-state-text">No {type}</h3>
      <p className="empty-state-subtext">
        Get started by creating your first {type.slice(0, -1)}
      </p>
    </div>
  );
}
