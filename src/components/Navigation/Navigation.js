import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import accountIcon from "../../images/account-icon.svg";
import "./Navigation.css";

const Navigation = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navigation">
      <div
        className={`navigation__menu ${
          isMenuOpen ? "navigation__menu_visible" : ""
        }`}
      >
        <div className="navigation__menu-content">
          <div className="navigation__links-container">
            <button
              className="navigation__menu-close-btn"
              type="button"
              onClick={toggleMenu}
            ></button>
            <ul className="navigation__links-list">
              <li className="navigation__link-item">
                <Link
                  to="/"
                  className={`navigation__link navigation__link_hidden ${
                    isActive("/") ? "navigation__link_active" : ""
                  }`}
                >
                  Главная
                </Link>
              </li>
              <li className="navigation__link-item">
                <Link
                  to="/movies"
                  className={`navigation__link ${
                    isActive("/movies") ? "navigation__link_active" : ""
                  }`}
                >
                  Фильмы
                </Link>
              </li>
              <li className="navigation__link-item">
                <Link
                  to="/saved-movies"
                  className={`navigation__link ${
                    isActive("/saved-movies") ? "navigation__link_active" : ""
                  }`}
                >
                  Сохранённые фильмы
                </Link>
              </li>
            </ul>
          </div>
          <Link to="/profile" className="navigation__link-profile">
            <img
              src={accountIcon}
              alt="Иконка профиля"
              className="navigation__icon-account"
            />
            Аккаунт
          </Link>
        </div>
      </div>
      <button
        className={`navigation__menu-btn ${
          isMenuOpen ? "navigation__menu-btn_hidden" : ""
        }`}
        type="button"
        onClick={toggleMenu}
      />
    </nav>
  );
};

export default Navigation;