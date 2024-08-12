import Logo from "../assets/logo.svg";
import { ROUTES } from "../router/pageRoutes";
import { Link, useNavigate } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Button } from "./Button";
import "../styles/topbar.css";

export function Topbar() {
  const navigate = useNavigate();

  return (
    <header>
      <div className="left_side_wrapper">
        <Link to={ROUTES.HOME}>
          <img src={Logo} alt="Home Service Logo"></img>
        </Link>
        <Navigation />
      </div>

      <div className="button-wrapper">
        <Button
          buttonText="Login / Sign Up"
                  onClick={() => navigate(ROUTES.LOGIN)}
                  isRound={false}
        />
      </div>
    </header>
  );
}
