import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Form, Formik } from "formik";
import { ROUTES } from "../router/pageRoutes";
import { Button } from "../components/Button";
import { UserContext } from "../context/UserContext";
import FormikField from "../components/FormikField";
import { useLoginUser } from "../customHooks/useLoginUser";
import * as Yup from "yup";
import "../styles/login.css";

const loginInitialValues = {
  email: "",
  password: "",
};

const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Field is required"),
  password: Yup.string().required("Field is required"),
});

export function Login() {
  const { login } = useContext(UserContext);
  const [error, setError] = useState("");
  const { mutateAsync: loginUser } = useLoginUser();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (formValues) => {
    try {
      const response = await loginUser(formValues);
      const { token, existingUser } = response;

      if (token && existingUser) {
        localStorage.setItem("token", token);
        login(existingUser);

        if (location.state?.fromBookingModal) {
          navigate(-1, { state: location.state });
        } else {
          navigate(ROUTES.HOME);
        }
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ?? "An unexpected error occurred";
      console.error(errorMessage);
      setError(errorMessage);
    }
  };

  return (
    <div className="login_container">
      <Formik
        initialValues={loginInitialValues}
        validationSchema={loginValidationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="login_form">
          <h2 className="form_title">Login</h2>
          <div className="field_wrapper">
            <FormikField
              name="email"
              type="email"
              placeholder="Email"
              className="form_input"
            />
          </div>
          <div className="field_wrapper">
            <FormikField
              name="password"
              type="password"
              placeholder="Password"
              className="form_input"
            />
          </div>
          {error && <p className="error_message">{error}</p>}
          <Button type="submit" buttonText="Log in" />
          <div className="signup_link_wrapper">
            <Link to={ROUTES.REGISTER} className="signup_link">
              Do not have an account? Sign up
            </Link>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
