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
          <ul>
            <li>
              <a href="/account">My Account</a>
            </li>
            <li>
              <a href="/my-bookings">My Booking</a>
            </li>
            <Logout />
          </ul>
        </div>
        )}
      </div>
    );
  }