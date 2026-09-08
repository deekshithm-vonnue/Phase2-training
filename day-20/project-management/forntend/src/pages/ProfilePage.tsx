import { Avatar } from "../components/Avatar";
import "../styles/profile.css";

export function ProfilePage() {
  return (
    <div className="profile-layout">
      <div className="profile-container">
        <Avatar name="Deekshith" />
        <div className="profile-content">
          <div>Deekshith</div>
        </div>
      </div>
    </div>
  );
}
