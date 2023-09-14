import React, { useState, useRef } from "react";
import "./Register.css";
import registerLogo from "../../images/header-logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

const Register = ({ onRegister, openPopup, closePopup }) => {
  const navigate = useNavigate();
  const { values, handleChange, errors, isValid, handleServerError } =
    useFormWithValidation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    onRegister(values.email, values.password, values.name)
      .then(() => {
        openPopup("Регистрация прошла успешно");
        setTimeout(() => {
          closePopup();
        }, 1000);
        navigate("/movies");
      })
      .catch((err) => {
        handleServerError(err.message, "registration");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <section className="register">
      <form ref={formRef} className="register__form" onSubmit={handleSubmit}>
        <div className="register__container">
          <NavLink to="/" className="register__logo-link">
            <img
              className="register__logo"
              src={registerLogo}
              alt="Лого регистрации"
            />
          </NavLink>
          <h1 className="register__title">Добро пожаловать!</h1>

          <p className="register__input-title">Имя</p>

          <input
            name="name"
            className={`register__input ${
              (errors.name || isSubmitting) && "register__input_error"
            }`}
            type="text"
            placeholder="Введите имя"
            value={values.name || ""}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          ></input>

          <p className="register__error">{errors.name}</p>

          <p className="register__input-title">E-mail</p>

          <input
            name="email"
            className={`register__input ${
              (errors.email || isSubmitting) && "register__input_error"
            }`}
            type="email"
            placeholder="Введите E-mail"
            autoComplete="username"
            value={values.email || ""}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          ></input>

          <p className="register__error">{errors.email}</p>

          <p className="register__input-title">Пароль</p>

          <input
            name="password"
            className={`register__input ${
              (errors.password || isSubmitting) && "register__input_error"
            }`}
            type="password"
            placeholder="Введите пароль"
            autoComplete="current-password"
            value={values.password || ""}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          ></input>

          <p className="register__error">{errors.password}</p>
        </div>

        <div className="register__btn-container">
          <p className="register__error register__error_active">
            {errors.registration}
          </p>
          <button
            className="register__button"
            type="submit"
            disabled={!isValid || isSubmitting}
          >
            Зарегистрироваться
          </button>
          <p className="register__text">
            Уже зарегистрированы?
            <NavLink className="register__link" to="/signin">
              Войти
            </NavLink>
          </p>
        </div>
      </form>
    </section>
  );
};

export default Register;
