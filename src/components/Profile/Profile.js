import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { getUser, updateUser, signout } from "../../utils/MainApi";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const navigate = useNavigate();

  const MIN_NAME_LENGTH = 3;
  const MAX_NAME_LENGTH = 12;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUser();
        setName(userData.name);
        setEmail(userData.email);
      } catch (error) {
        console.log(error);
        setErrorMessage("При обновлении профиля произошла ошибка.");
      }
    };

    if (process.env.NODE_ENV === "development") {
      setName("Виталий");
      setEmail("pochta@yandex.ru");
    } else {
      fetchUserData();
    }
  }, []);

  const handleEditButtonClick = (evt) => {
    evt.preventDefault();
    setIsEditing(true);
  };

  const handleSaveButtonClick = async (evt) => {
    evt.preventDefault();
    setIsEditing(false);

    try {
      const updatedUserData = await updateUser(email, name);
      setName(updatedUserData.name);
      setEmail(updatedUserData.email);
    } catch (error) {
      console.log(error);
      if (error.message === "Conflict") {
        setErrorMessage("Пользователь с таким email уже существует.");
      } else {
        setErrorMessage("При обновлении профиля произошла ошибка.");
      }
    }
  };

  const handleSignOut = async () => {
    try {
      await signout();
      navigate(-1); //возвращает на предыдущую страницу из истории
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <section className="profile">
        <form className="profile__form">
          <div className="profile__info">
            <h1 className="profile__title">Привет, {name}!</h1>
            <div
              className={`profile__input-name ${
                isInputFocused ? "focused" : ""
              }`}
            >
              <label className="profile__name" htmlFor="name">
                Имя
              </label>
              <input
                id="name"
                className="profile__input"
                type="text"
                placeholder="Введите имя"
                value={name}
                onChange={(e) => {
                  if (e.target.value.length <= MAX_NAME_LENGTH) {
                    setName(e.target.value);
                  }
                }}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                disabled={!isEditing}
                required
              />
              {(name.length < MIN_NAME_LENGTH ||
                name.length > MAX_NAME_LENGTH) && (
                <p className="profile__error">
                  {/* {`Длина должна быть от ${MIN_NAME_LENGTH} до ${MAX_NAME_LENGTH} символов`} */}
                </p>
              )}
            </div>
            <div className="profile__input-email">
              <label className="profile__email" htmlFor="email">
                E-mail
              </label>
              <input
                id="email"
                className="profile__input"
                type="email"
                placeholder="Введите Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isEditing}
                required
              />
            </div>
          </div>
          <div className="profile__btns">
            {isEditing ? (
              <button
                onClick={handleSaveButtonClick}
                className="profile__btn-save"
                type="submit"
              >
                Сохранить
              </button>
            ) : (
              <>
                {errorMessage && (
                  <p className="profile__error">{errorMessage}</p>
                )}
                <button
                  onClick={handleEditButtonClick}
                  className="profile__btn-edit"
                  type="button"
                >
                  Редактировать
                </button>
                <button
                  className="profile__btn-escape"
                  type="button"
                  onClick={handleSignOut}
                >
                  Выйти из аккаунта
                </button>
              </>
            )}
          </div>
        </form>
      </section>
    </main>
  );
};

export default Profile;
