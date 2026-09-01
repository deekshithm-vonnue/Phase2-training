import "../styles/sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolderOpen,       
  faCircleExclamation, 
  faUser,              
} from "@fortawesome/free-solid-svg-icons";

interface SideBarProps {
  isOpen: boolean;
}

function SiderBar({ isOpen }: SideBarProps) {
  return (
    <div className={`sidebar ${isOpen ? "open" : "close"}`}>
      <nav className="sidebar-nav">
        <div className="sidebar-item">
          <FontAwesomeIcon icon={faFolderOpen} className="sidebar-icon" />
          <span>Projects</span>
        </div>
        <div className="sidebar-item">
          <FontAwesomeIcon
            icon={faCircleExclamation}
            className="sidebar-icon"
          />
          <span>Issues</span>
        </div>
        <div className="sidebar-item">
          <FontAwesomeIcon
            icon={faUser}
            className="sidebar-icon"
          />
          <span>Profile</span>
        </div>
      </nav>
    </div>
  );
}

export default SiderBar;
