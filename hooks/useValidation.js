import React, { useState, useEffect } from 'react';

const useValidation = (initialState, validate, fn) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitForm, setSubmitForm] = useState(false);

  useEffect(() => {
    if (submitForm) {
      const hasError = Object.keys(errors).length !== 0;
      if (!hasError) {
        fn();
      }
      setSubmitForm(false);
    }
  }, [errors]);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validateErrors = validate(values);
    setErrors(validateErrors);
    setSubmitForm(true);
  };

  const handleBlur = () => {
    setErrors({});
  };

  return {
    values,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
  };
};

export default useValidation;
