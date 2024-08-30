import Logo from "../assets/logo.svg";
import { ROUTES } from "../router/pageRoutes";
import { Link, useNavigate } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Button } from "./Button";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { UserAvatar } from "./UserAvatar";
import "../styles/topbar.css";

export function Topbar() {
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleAvatarClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    logout();
    navigate(ROUTES.HOME);
  };

  return (
    <header>
      <div className="left_side_wrapper">
        <Link to={ROUTES.HOME}>
          <img src={Logo} alt="Home Service Logo" />
        </Link>
        <Navigation />
      </div>

      <div className="button-avatar-wrapper">
        {user && user.email ? (
          <div className="avatar-dropdown-wrapper">
            <UserAvatar onClick={handleAvatarClick}>
              {user.email[0]}
            </UserAvatar>
            {isDropdownOpen && (
              <div className="avatar-dropdown-menu">
                <ul>
                  <li onClick={() => navigate(ROUTES.ACCOUNT)}>My Account</li>
                  <li onClick={() => navigate(ROUTES.BOOKINGS)}>My Bookings</li>
                  <li onClick={handleLogout}>Logout</li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <Button
            buttonText="Login / Sign Up"
            onClick={() => navigate(ROUTES.LOGIN)}
            isRound={false}
          />
        )}
      </div>
    </header>
  );
}