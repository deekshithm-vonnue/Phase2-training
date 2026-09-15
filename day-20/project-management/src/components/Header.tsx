import "../styles/header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

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
    </header>
  );
}

export default Header;
