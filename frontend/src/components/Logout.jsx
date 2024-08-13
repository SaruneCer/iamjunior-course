import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Button } from "./Button";

export function Logout({ onClose }) {
  const { logout } = useContext(UserContext);

  const handleLogout = () => {
    logout();
    onClose(); 
  };

  return (
    <div className="logout-modal">
      <Button onClick={handleLogout} buttonText="Logout" />
    </div>
  );
}
