import React from "react";
import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import headerLogo from "../../images/header-logo.svg";
import NavAuth from "../NavTab/NavTab";
import Navigation from "../Navigation/Navigation";

const Header = ({ loggedIn, isLoading }) => {
  const { pathname } = useLocation();
  const isHomePage = pathname === "/";

  return (
    <header
      className={`header ${!isHomePage && "header_type_auth"}
     ${pathname === "/profile" && "header_type_white"}`}
    >
      <Link to="/" className="header__link">
        <img
          className="header__logo"
          src={headerLogo}
          alt="Логотип Movies Explorer"
        />
      </Link>
      {!isLoading && (isHomePage ? <NavAuth /> : <Navigation />)}
    </header>
  );
};

export default Header;
