import { useParams } from "react-router-dom";
import mockData from "../../mockdata.json";
import "../styles/issue.css";
export function IssueDetail() {
  const { issueId } = useParams();
  const issue = mockData.issues.find((isssue) => isssue.id == issueId);
  return (
    <div key={issue?.id} className="issue-card issue-details">
      <div className="issue-card-header">
        <div className="issue-title">{issue?.title}</div>
      </div>
      <div className="issue-card-body">
        <p className="issue-card-description">{issue?.description}</p>
        <div className="issue-card-footer-group">
          <div className="issue-card-meta">
            <div className="issue-card-date">
              <span className="issue-card-date-label">DUE Date </span>
              <span className="issue-card-date-value">{issue?.dueDate}</span>
            </div>
            <div className="issue-card-status">
              <span className="issue-card-status-label">Status</span>
              <span
                className={`issue-card-status-value issue-card-status-value-${issue?.status.toLowerCase()}`}
              ></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
