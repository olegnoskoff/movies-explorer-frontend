import React, { useState } from "react";
import "./Login.css";
import loginLogo from "../../images/header-logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { login } from "../../utils/MainApi";
import { handleError } from "../../utils/handleError";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [tokenError, setTokenError] = useState("");

  const handleErrors = (err) => {
    const { fieldName, errorMessage } = handleError(err);

    switch (fieldName) {
      case "email":
        setEmailError(errorMessage);
        break;
      case "password":
        setPasswordError(errorMessage);
        break;
      case "token":
        setTokenError(errorMessage);
        break;
      default:
        setEmailError("");
        setPasswordError("");
        setTokenError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      handleErrors(err);
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
              alt="Лого регистрации"
            />
          </NavLink>
          <h1 className="login__title">Рады видеть!</h1>
          <FormField
            title="E-mail"
            value={email}
            error={emailError}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Введите E-mail"
            type="email"
          />
          <FormField
            title="Пароль"
            value={password}
            error={passwordError}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите пароль"
            type="password"
            minLength={8} // Минимальная длина для пароля
            maxLength={20} // Максимальная длина для пароля
          />
        </div>
        <div className="login__button-container">
          <button className="login__button" type="button">
            Войти
          </button>
          <p className="login__text">
            Ещё не зарегистрированы?
            <NavLink className="login__link" to="/signup">
              Регистрация
            </NavLink>
          </p>
        </div>
        {tokenError && <span className="login__error">{tokenError}</span>}
      </form>
    </section>
  );
};

const FormField = ({
  title,
  value,
  error,
  onChange,
  placeholder,
  type,
  minLength,
  maxLength,
}) => (
  <>
    <p className="login__input-title">{title}</p>
    <input
      className={`login__input ${error && "login__input_error"}`}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      minLength={minLength}
      maxLength={maxLength}
      required
    />
    <span className="login__error">{error}</span>
  </>
);

export default Login;
