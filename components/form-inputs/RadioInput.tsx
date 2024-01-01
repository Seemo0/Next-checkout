import React from "react";

interface InputProps {
  label?: string;
  value: string;
  name: string;
  formik: any;
  onChange?: any;
}

const RadioInput: React.FC<InputProps> = ({
  formik,
  label,
  name,
  onChange,
  value
}) => {
  const error = formik.errors[name];
  const touched = formik.touched[name];

  const handleChange = (event: any) => {
    const value = event.target.value;

    formik.setFieldValue(name, value, formik.validateOnChange);

    formik.setFieldTouched(
      name,
      value !== formik.initialValues[name],
      formik.validateOnChange
    );
  };

  return (
    <div className="flex items-center">
      <input
        type="radio"
        name={name}
        value={value}
        onChange={onChange ?? handleChange}
        onBlur={formik.handleBlur}
        checked={formik.values[name] === value}
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
};

export default RadioInput;
