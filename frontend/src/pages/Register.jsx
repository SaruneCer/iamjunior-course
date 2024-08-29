import * as Yup from "yup";
import { Button } from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../router/pageRoutes";
import { Formik, Form } from "formik";
import FormikField from "../components/FormikField";
import "../styles/login.css";
import useCreateUser from "../customHooks/useCreateUser";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const errorMessage = {
  required: "Field is required",
  email: "Invalid email address",
};

const registerValidationSchema = Yup.object().shape({
  name: Yup.string().required(errorMessage.required),
  email: Yup.string().email(errorMessage.email).required(errorMessage.required),
  password: Yup.string().required(errorMessage.required),
});

const registerInitialValues = {
  name: "",
  email: "",
  password: "",
};

export function Register() {
  const { mutateAsync: createUser, isLoading, error } = useCreateUser();
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const user = await createUser(values);
      login(user);
      navigate(ROUTES.HOME);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login_container">
      <div className="login_form_box">
        <Formik
          initialValues={registerInitialValues}
          validationSchema={registerValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="login_form">
              <h2 className="form_title">Register</h2>
              {error && <p className="error_message">{error.message}</p>}
              <FormikField
                name="name"
                type="text"
                placeholder="Name"
                className="form_input"
              />
              <FormikField
                name="email"
                type="email"
                placeholder="Email"
                className="form_input"
              />
              <FormikField
                name="password"
                type="password"
                placeholder="Password"
                className="form_input"
              />
              <Button
                type="submit"
                buttonText="Register"
                disabled={isSubmitting || isLoading}
              />
              <div className="signup_link_wrapper">
                <Link to={ROUTES.LOGIN} className="signup_link">
                  Already have an account? Log in
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
