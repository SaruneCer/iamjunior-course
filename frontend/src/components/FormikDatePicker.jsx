import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Field } from "formik";
import { format } from "date-fns";

const FormikDatePicker = ({ selectedDate, setSelectedDate, setFieldValue }) => {
  return (
    <Field name="date">
      {({ field }) => (
        <Calendar
          {...field}
          onChange={(date) => {
            setSelectedDate(date);
            setFieldValue("date", format(date, "yyyy-MM-dd"));
          }}
          value={selectedDate}
        />
      )}
    </Field>
  );
};

export default FormikDatePicker;
