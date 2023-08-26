import React from "react";
import "./AboutMe.css";
import foto from "../../images/about-foto.png";

const AboutMe = () => {
  return (
    <section className="about">
      <h2 className="about__title">Студент</h2>
      <div className="about__profile">
        <img
          className="about__profile-photo"
          src={foto}
          alt="Фото профиля Олега"
        />
        <article className="about__profile-text">
          <h3 className="about__profile-text-name">Олег</h3>
          <h4 className="about__profile-text-group">
            Фронтенд-разработчик, 30 годиков
          </h4>
          <p className="about__profile-text-description">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a
            className="about__profile-text-link"
            href="https://github.com/olegnoskoff"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </article>
      </div>
    </section>
  );
};

export default AboutMe;
