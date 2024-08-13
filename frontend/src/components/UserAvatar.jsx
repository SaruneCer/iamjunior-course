import { useState } from "react";
import { Logout } from "./Logout";
import "../styles/user_avatar.css"

export function UserAvatar({ children }) {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
  
    const toggleDropdown = () => {
      setDropdownOpen(!isDropdownOpen);
    };
  
    return (
      <div className="avatar-container">
        <div className="avatar-wrapper" onClick={toggleDropdown}>
          {children}
        </div>
  
        {isDropdownOpen && (
          <div className="dropdown-menu">
            <Logout onClose={toggleDropdown} />
          </div>
        )}
      </div>
    );
  }