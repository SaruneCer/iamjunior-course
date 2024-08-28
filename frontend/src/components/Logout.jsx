import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export function Logout({ onClose }) {
  const { logout } = useContext(UserContext);

  const handleLogout = () => {
    logout();
    onClose(); 
  };

  return (
    <li onClick={handleLogout} style={{ cursor: 'pointer' }}>
      Logout
    </li>
  );
}
