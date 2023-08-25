import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorStatus.css';

const ErrorStatus = () => {
  return (
    <div className="error-status">
      <div className="error-status__message">
        <h2 className="error-status__code">404</h2>
        <p className="error-status__text">Страница не найдена</p>
      </div>
      <Link to="/" className="error-status__back">Назад</Link>
    </div>
  );
};

export default ErrorStatus;
