import { Link } from "react-router-dom";
import { Logout } from "./Logout";
import "../styles/user_avatar.css";

export function UserAvatar({ children, isDropdownOpen, toggleDropdown }) {
  return (
    <div className="avatar-container">
      <div className="avatar-wrapper" onClick={toggleDropdown}>
        {children}
      </div>

      {isDropdownOpen && (
        <div className="avatar-dropdown-menu">
          <ul>
            <li>
              <Link to="/account">My Account</Link>
            </li>
            <li>
              <Link to="/my-bookings">My Bookings</Link>
            </li>
            <Logout />
          </ul>
        </div>
      )}
    </div>
  );
}
