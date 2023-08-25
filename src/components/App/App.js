/* eslint-disable no-unused-vars */
import "./App.css";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import { getUser, register, login } from "../../utils/MainApi";
import ErrorStatus from "../ErrorBanner/ErrorStatus";

function InnerApp() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const { pathname } = useLocation();

  const handleRegister = (email, password, name) => {
    return register(email, password, name).then((res) => {
      if (res) {
        setLoggedIn(true);
        setCurrentUser(res);
        return res;
      }
    });
  };

  const handleLogin = (email, password) => {
    return login(email, password).then((res) => {
      if (res) {
        setLoggedIn(true);
        setCurrentUser(res);
        return res;
      }
    });
  };

  useEffect(() => {
    //getUserInfo(); в разработке
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        {["/", "/movies", "/saved-movies", "/profile"].includes(pathname) && (
          <Header loggedIn={loggedIn} />
        )}
        <main>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/signin" element={<Login onLogin={handleLogin} />} />
            <Route
              path="/signup"
              element={<Register onRegister={handleRegister} />}
            />
            <Route
              path="/profile"
              element={<Profile loggedIn={loggedIn} user={currentUser} />}
            />
            <Route path="/movies" element={<Movies />} />
            <Route path="/saved-movies" element={<SavedMovies />} />
            <Route path="*" element={<ErrorStatus />} />
          </Routes>
        </main>
        {["/", "/movies", "/saved-movies"].includes(pathname) && <Footer />}
      </div>
    </CurrentUserContext.Provider>
  );
}

function App() {
  return (
    <Router>
      <InnerApp />
    </Router>
  );
}

export default App;
