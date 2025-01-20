import { logout } from "../../../services/logout";
import "./LogoutButton.css";

export default function LogoutButton() {
  const handleLogout = async () => {
    const result = await logout();
    if (result.error) {
      console.error("Logout failed:", result.error);
    } else {
      window.location.href = "/";
    }
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
  );
}
