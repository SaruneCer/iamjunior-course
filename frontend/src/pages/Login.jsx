import { Button } from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../router/pageRoutes";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import "../styles/login.css";

export function Login() {
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = {};

    if (!email) {
      validationErrors.email = "Field is required";
    }

    if (!password) {
      validationErrors.password = "Field is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    login({ email, password });
    navigate(ROUTES.HOME);
  };

  return (
    <div className="login_container">
      <div className="login_form_box">
        <form className="login_form">
          <h2 className="form_title">Login</h2>
          <div className="field_wrapper">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="form_input"
            />
            {errors.email && <p className="error_message">{errors.email}</p>}
          </div>
          <div className="field_wrapper">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="form_input"
            />
            {errors.password && <p className="error_message">{errors.password}</p>}
          </div>
          <Button type="submit" buttonText="Log in" onClick={handleSubmit}/>
          <div className="signup_link_wrapper">
            <Link to={ROUTES.REGISTER} className="signup_link">
              Do not have an account? Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
