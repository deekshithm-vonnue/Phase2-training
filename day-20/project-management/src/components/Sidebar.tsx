import "../styles/sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolderOpen,
  faCircleExclamation,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
interface SideBarProps {
  isOpen: boolean;
  handleClose: ()=> void
}

function SiderBar({ isOpen,handleClose }: SideBarProps) {
  // useEffect()
  return (
    <div className={`sidebar ${isOpen ? "open" : "close"}`}>
      <nav className="sidebar-nav">
        <Link to="/projects" className="sidebar-item" onClick={handleClose}>
          <FontAwesomeIcon icon={faFolderOpen} className="sidebar-icon" />
          <span>Projects</span>
        </Link>
        <Link to="/issues" className="sidebar-item"  onClick={handleClose}>
          <FontAwesomeIcon
            icon={faCircleExclamation}
            className="sidebar-icon"
          />
          <span>Issues</span>
        </Link>
        <Link to="/profile" className="sidebar-item"  onClick={handleClose}>
          <FontAwesomeIcon icon={faUser} className="sidebar-icon" />
          <span>Profile</span>
        </Link>
      
      </nav>
    </div>
  );
}

export default SiderBar;
