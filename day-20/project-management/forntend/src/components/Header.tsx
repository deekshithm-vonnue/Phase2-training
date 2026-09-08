import "../styles/header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

interface HeaderProps {
  onClick: () => void;
}
function Header({ onClick }: HeaderProps) {
  return (
    <header className="header-container">
      <FontAwesomeIcon
        icon={faBars}
        className="hamburger-icon"
        onClick={onClick}
      />
      <div className="headline-content">DashBoard</div>
       <Link to="/login" className="login-style" >
          <FontAwesomeIcon icon={faUser} className="sidebar-icon" />
          Login
        </Link>
    </header>
  );
}

export default Header;
