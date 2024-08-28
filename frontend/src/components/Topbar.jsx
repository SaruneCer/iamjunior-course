import Logo from "../assets/logo.svg";
import { ROUTES } from "../router/pageRoutes";
import { Link, useNavigate } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Button } from "./Button";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { UserAvatar } from "./UserAvatar";
import "../styles/topbar.css";

export function Topbar() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  return (
    <header>
      <div className="left_side_wrapper">
        <Link to={ROUTES.HOME}>
          <img src={Logo} alt="Home Service Logo"></img>
        </Link>
        <Navigation />
      </div>

      <div className="button-avatar-wrapper">
        {user ? (
          <UserAvatar>{user.email[0]}</UserAvatar>
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
