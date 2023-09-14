import React from "react";
import "./Portfolio.css";
import porfolioIcon from "../../images/porfolio-icon.svg";

const projects = [
  {
    title: "Статичный сайт",
    link: "https://github.com/olegnoskoff/how-to-learn.git",
  },
  {
    title: "Адаптивный сайт",
    link: "https://github.com/olegnoskoff/russian-travel.git",
  },
  {
    title: "Одностраничное приложение",
    link: "https://github.com/olegnoskoff/react-mesto-api-full-gha.git",
  },
];

const Portfolio = () => {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        {projects.map((project, index) => (
          <li key={index} className="portfolio__item">
            <a
              className="portfolio__link"
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.title}
              <img
                className="portfolio__icon"
                src={porfolioIcon}
                alt="иконка перехода"
              />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Portfolio;
