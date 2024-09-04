import { Field, ErrorMessage } from 'formik';

const FormikField = ({ name, type = 'text', placeholder, className }) => (
  <div className="field_wrapper">
    <Field
      name={name}
      type={type}
      placeholder={placeholder}
      className={className}
    />
    <ErrorMessage name={name} component="p" className="error_message" />
  </div>
);

export default FormikField;
