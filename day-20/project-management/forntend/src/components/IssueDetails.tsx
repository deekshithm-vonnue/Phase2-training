import { useParams } from "react-router-dom";
import "../styles/issue.css";
import { NotFound } from "./NotFound";
import { useIssue } from "../apiclient/test";
export function IssueDetail() {
  const { issueId } = useParams();
  const { issue, isLoading, error, refetch } = useIssue(issueId);
  if (!issue) {
    return <NotFound />;
  }
  if (isLoading) return <div className="loading-state"></div>;
  if (error)
    return (
      <div className="error-state">
        <p>Error: {error}</p>
        <button onClick={refetch}>Try Again</button>
      </div>
    );
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
              <span className="issue-card-date-value">
                {issue?.dueDate
                  ? issue.dueDate.toLocaleDateString()
                  : "No Date"}
              </span>
            </div>
            <div className="issue-card-status">
              <span className="issue-card-status-label">Status</span>
              <span
                className={`issue-card-status-value issue-card-status-value-${issue?.status.toLowerCase()}`}
              >
                {issue?.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
