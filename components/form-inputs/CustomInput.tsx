import React from "react";

interface InputProps {
  label?: string;
  name: string;
  formik: any;
  type: string;
  onChange?: any;
}

const CustomInput: React.FC<InputProps> = ({
  formik,
  label,
  name,
  type = "text",
  onChange,
}) => {
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
    <div className="flex flex-col space-y-2">
      {label && (
        <div className="flex justify-between">
          <label htmlFor={name}>{label}</label>
          {formik.touched[name] && formik.errors[name] && (
            <span className="text-red-500 text-sm ml-2">
              {formik.errors[name]}
            </span>
          )}
        </div>
      )}
      <input
        type={type}
        name={name}
        value={formik.values[name]}
        onChange={onChange ?? handleChange}
        onBlur={formik.handleBlur}
        className={`${
          formik.touched[name] && formik.errors[name] ? "border-red-500" : ""
        } border rounded-md p-2`}
      />
    </div>
  );
};

export default CustomInput;
