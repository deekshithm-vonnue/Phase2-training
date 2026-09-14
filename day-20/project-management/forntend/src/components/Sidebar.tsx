import "../styles/sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolderOpen,
  faCircleExclamation,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { useState } from "react";
interface SideBarProps {
  isOpen: boolean;
  handleClose: () => void;
}

function SideBar({ isOpen, handleClose }: SideBarProps) {
  const [title, setTitle] = useState<string>("DashBoard");
  useDocumentTitle(title);

    const handleNewClick =(newTitle: string)=>{
      handleClose();
      setTitle(newTitle)
    }
  return (
    <div className={`sidebar ${isOpen ? "open" : "close"}`}>
      <nav className="sidebar-nav">
        <NavLink
          to="/projects"
          className="sidebar-item"
          onClick={() => handleNewClick("Projects")}
        >
          <FontAwesomeIcon icon={faFolderOpen} className="sidebar-icon" />
          <span>Projects</span>
        </NavLink>
        <NavLink
          to="/issues"
          className="sidebar-item"
          onClick={() =>  handleNewClick("Issues")}
        >
          <FontAwesomeIcon
            icon={faCircleExclamation}
            className="sidebar-icon"
          />
          <span>Issues</span>
        </NavLink>
        <NavLink
          to="/profile"
          className="sidebar-item"
          onClick={() =>  handleNewClick("Profile")}
        >
          <FontAwesomeIcon icon={faUser} className="sidebar-icon" />
          <span>Profile</span>
        </NavLink>
      </nav>
    </div>
  );
}

export default SideBar;
