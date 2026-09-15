import "../styles/header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/useAuth";

interface HeaderProps {
  onClick: () => void;
}
function Header({ onClick }: HeaderProps) {
  const { logout } = useAuth();

  return (
    <header className="header-container">
      <FontAwesomeIcon
        icon={faBars}
        className="hamburger-icon"
        onClick={onClick}
      />
      <div className="headline-content">DashBoard</div>
      <FontAwesomeIcon
        icon={faRightFromBracket}
        onClick={logout}
        style={{ cursor: "pointer", color: "#dc3545", height: "30px" }} // Styled red for exit context
      />
    </header>
  );
}

export default Header;
