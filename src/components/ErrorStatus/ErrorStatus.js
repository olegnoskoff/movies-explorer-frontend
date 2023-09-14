import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ErrorStatus.css";

const ErrorStatus = ({ customMessage }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const errorMessage =
    customMessage ||
    queryParams.get("message") ||
    "Произошла неизвестная ошибка";

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <section className="error-status">
      <div className="error-status__message">
        <h1 className="error-status__code">404</h1>
        <p className="error-status__text">{errorMessage}</p>
      </div>
      <button onClick={handleBackClick} className="error-status__back">
        Назад
      </button>
    </section>
  );
};

export default ErrorStatus;
