import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Field is required"),
  password: Yup.string().required("Field is required"),
});
