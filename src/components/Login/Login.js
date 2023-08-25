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
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <div className="login__container">
          <NavLink to="/" className="login__logo-link">
            <img
              className="login__logo"
              src={loginLogo}
              alt="Лого регистрации"
            />
          </NavLink>
          <h2 className="login__title">Рады видеть!</h2>
          <p className="login__input-title">E-mail</p>
          <input
            className={`login__input ${emailError && "login__input_error"}`}
            type="email"
            placeholder="Введите E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <span className="login__error">{emailError}</span>
          <p className="login__input-title">Пароль</p>
          <input
            className={`login__input ${passwordError && "login__input_error"}`}
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span className="login__error">{passwordError}</span>
        </div>
        <div className="login__button-container">
          <button className="login__button" type="submit">
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
    </div>
  );
};

export default Login;
