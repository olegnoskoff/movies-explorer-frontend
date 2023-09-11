import React from "react";
import "./Login.css";
import loginLogo from "../../images/header-logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

const Login = ({ onLogin, openPopup, closePopup }) => {
  const navigate = useNavigate();
  const { values, handleChange, errors, isValid, handleServerError } =
    useFormWithValidation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onLogin(values.email, values.password);
      openPopup("Вход выполнен успешно");
      setTimeout(() => {
        closePopup();
      }, 2000);
      navigate("/movies");
    } catch (err) {
      handleServerError(err.message, "registration");
      openPopup("Что-то пошло не так");
    }
  };

  return (
    <section className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <div className="login__container">
          <NavLink to="/" className="login__logo-link">
            <img
              className="login__logo"
              src={loginLogo}
              alt="Логотип регистрации"
            ></img>
          </NavLink>
          <h2 className="login__title">Рады видеть!</h2>
          <p className="login__input-title">E-mail</p>

          <input
            name="email"
            className={`login__input ${errors.email && "login__input_error"}`}
            type="email"
            placeholder="Введите E-mail"
            autoComplete="username"
            value={values.email || ""}
            onChange={handleChange}
            required
          ></input>
          <p className="login__error">{errors.email}</p>

          <p className="login__input-title">Пароль</p>

          <input
            name="password"
            className={`login__input ${
              errors.password && "login__input_error"
            }`}
            type="password"
            placeholder="Введите пароль"
            autoComplete="current-password"
            value={values.password || ""}
            onChange={handleChange}
            required
          ></input>
          <p className="login__error">{errors.password}</p>
        </div>
        <div className="login__button-container">
          {errors.token && (
            <p className="login__error login__error_active">{errors.token}</p>
          )}
          <button className="login__button" type="submit" disabled={!isValid}>
            Войти
          </button>
          <p className="login__text">
            Ещё не зарегистрированы?
            <NavLink className="login__link" to="/signup">
              Регистрация
            </NavLink>
          </p>
        </div>
      </form>
    </section>
  );
};

export default Login;
