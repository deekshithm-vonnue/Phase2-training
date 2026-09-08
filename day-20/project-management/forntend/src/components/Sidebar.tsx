import "../styles/sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolderOpen,
  faCircleExclamation,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
interface SideBarProps {
  isOpen: boolean;
  handleClose: () => void;
}

function SiderBar({ isOpen, handleClose }: SideBarProps) {
  // useEffect()
  return (
    <div className={`sidebar ${isOpen ? "open" : "close"}`}>
      <nav className="sidebar-nav">
        <NavLink to="/projects" className="sidebar-item" onClick={handleClose}>
          <FontAwesomeIcon icon={faFolderOpen} className="sidebar-icon" />
          <span>Projects</span>
        </NavLink>
        <NavLink to="/issues" className="sidebar-item" onClick={handleClose}>
          <FontAwesomeIcon
            icon={faCircleExclamation}
            className="sidebar-icon"
          />
          <span>Issues</span>
        </NavLink>
        <NavLink to="/profile" className="sidebar-item" onClick={handleClose}>
          <FontAwesomeIcon icon={faUser} className="sidebar-icon" />
          <span>Profile</span>
        </NavLink>
      </nav>
    </div>
  );
}

export default SiderBar;
