import { Link } from "react-router-dom";
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
              <Link to="/account">My Account</Link>
            </li>
            <li>
              <Link to="/my-bookings">My Booking</Link>
            </li>
            <Logout />
          </ul>
        </div>
        )}
      </div>
    );
  }