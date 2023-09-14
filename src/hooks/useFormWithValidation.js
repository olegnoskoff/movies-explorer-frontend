import React, { useCallback } from "react";

export function useForm() {
  const [values, setValues] = React.useState({});

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  return { values, handleChange, setValues };
}

export function useFormWithValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const validateName = (value) => {
    const namePattern = /^[A-Za-zА-Яа-я\s-]+$/;
    return namePattern.test(value) && value.length >= 2;
  };

  const validateEmail = (value) => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailPattern.test(value);
  };

  const validatePassword = (value) => {
    return value.length >= 6;
  };

  const errorMessages = {
    name: "Имя должно содержать только латиницу, кириллицу, пробел или дефис и быть не менее 2 символов",
    email: "Введите корректный адрес электронной почты",
    password: "Пароль должен содержать не менее 6 символов",
  };

  const handleServerError = (errorMessage, pageType) => {
    setErrors({ ...errors, [pageType]: errorMessage });
    setIsValid(false);
  };

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));

    if (name === "name" && !validateName(value)) {
      setErrors({ ...errors, [name]: errorMessages[name] });
      setIsValid(false);
    } else if (name === "email" && !validateEmail(value)) {
      setErrors({ ...errors, [name]: errorMessages[name] });
      setIsValid(false);
    } else if (name === "password" && !validatePassword(value)) {
      setErrors({ ...errors, [name]: errorMessages[name] });
      setIsValid(false);
    } else {
      setErrors({ ...errors, [name]: "" });
      setIsValid(target.closest("form").checkValidity());
    }
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    handleServerError,
    setValues,
  };
}
