import React, { useState } from "react";
import "./Register.css";
import registerLogo from "../../images/header-logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { handleError } from "../../utils/handleError";

const Register = ({ onRegister }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onRegister(email, password, name);
      navigate("/signin");
    } catch (err) {
      handleRegistrationError(err);
    }
  };

  const handleRegistrationError = (err) => {
    const { fieldName, errorMessage } = handleError(err);

    setNameError(fieldName === "name" ? errorMessage : "");
    setEmailError(fieldName === "email" ? errorMessage : "");
    setPasswordError(
      fieldName === "password"
        ? errorMessage
        : "При регистрации пользователя произошла ошибка."
    );
  };

  return (
    <section className="register">
      <form className="register__form" onSubmit={handleSubmit}>
        <div className="register__container">
          <NavLink to="/" className="register__logo-link">
            <img
              className="register__logo"
              src={registerLogo}
              alt="Логотип регистрации"
            />
          </NavLink>
          <h1 className="register__title">Добро пожаловать!</h1>
          <FormField
            title="Имя"
            value={name}
            error={nameError}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введите имя"
            type="text"
            minLength={3} // Минимальная длина для имени
            maxLength={20} // Максимальная длина для имени
          />
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
        <div className="register__btn-container">
          <button className="register__button" type="submit">
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
    <label className="register__input-title" htmlFor={title.toLowerCase()}>
      {title}
    </label>
    <input
      id={title.toLowerCase()}
      className={`register__input ${error ? "register__input_error" : ""}`}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      minLength={minLength}
      maxLength={maxLength}
      required
    />
    <p className="register__error">{error}</p>
  </>
);

export default Register;