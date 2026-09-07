import { Link } from "react-router-dom";
import "../styles/notFound.css";
export function NotFound() {
  return (
    <div className="not-found">
      <h1>404 - Page not Found</h1>
      <Link to="/projects" className="link-to">Go back to project</Link>
    </div>
  );
}
