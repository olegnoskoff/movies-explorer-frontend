import React from "react";
import { Link } from "react-router-dom";
import "./ErrorStatus.css";

const ErrorStatus = () => {
  return (
    <section className="error-status">
      <div className="error-status__message">
        <h1 className="error-status__code">404</h1>
        <p className="error-status__text">Страница не найдена</p>
      </div>
      <Link to="/" className="error-status__back">
        Назад
      </Link>
    </section>
  );
};

export default ErrorStatus;
