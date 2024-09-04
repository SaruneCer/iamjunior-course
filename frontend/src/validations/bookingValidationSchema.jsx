import * as Yup from "yup";

export const bookingValidationSchema = Yup.object({
  time: Yup.string().required("Please select a time slot"),
});
