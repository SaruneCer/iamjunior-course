import React, { useContext, useState } from 'react';
import Logo from "../assets/logo.svg";
import { ROUTES } from "../router/pageRoutes";
import { Link, useNavigate } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Button } from "./Button";
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
    setIsDropdownOpen(false);
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
            <UserAvatar toggleDropdown={handleAvatarClick}>
              {user.email[0]}
            </UserAvatar>
            {isDropdownOpen && (
              <div className="avatar-dropdown-menu">
                <ul>
                  <li>
                    <Link to={ROUTES.ACCOUNT}>My Account</Link>
                  </li>
                  <li>
                    <Link to={ROUTES.BOOKINGS}>My Bookings</Link>
                  </li>
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
