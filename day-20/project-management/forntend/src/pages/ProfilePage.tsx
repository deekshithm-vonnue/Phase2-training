import { Avatar } from "../components/Avatar";
import { useAuth } from "../context/useAuth";
import "../styles/profile.css";

export function ProfilePage() {

  const {user} = useAuth();
  return (
    <div className="profile-layout">
      <div className="profile-container">
        <Avatar name="Deekshith" />
        <div className="profile-content">
          <div>{user?.name}</div>
        </div>
      </div>
    </div>
  );
}
