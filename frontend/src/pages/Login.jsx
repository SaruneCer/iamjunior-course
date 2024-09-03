import { Button } from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../router/pageRoutes";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../styles/login.css";

export function Login() {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Field is required"),
      password: Yup.string().required("Field is required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await login(values);
        navigate(ROUTES.HOME);
      } catch (error) {
        setErrors({ general: 'Login failed. Please check your credentials and try again.' });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="login_container">
      <div className="login_form_box">
        <form className="login_form" onSubmit={formik.handleSubmit}>
          <h2 className="form_title">Login</h2>
          <div className="field_wrapper">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form_input"
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="error_message">{formik.errors.email}</p>
            ) : null}
          </div>
          <div className="field_wrapper">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form_input"
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="error_message">{formik.errors.password}</p>
            ) : null}
          </div>
          {formik.errors.general && <p className="error_message">{formik.errors.general}</p>}
          <Button type="submit" buttonText="Log in" disabled={formik.isSubmitting} />
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