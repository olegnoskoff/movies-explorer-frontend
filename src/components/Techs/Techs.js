import React from "react";
import "./Techs.css";

const technologies = [
  "HTML",
  "CSS",
  "JS",
  "React",
  "Git",
  "Express.js",
  "mongoDB",
];

const Techs = () => {
  return (
    <section className="techs">
      <h2 className="techs__title">Технологии</h2>
      <div className="techs__about">
        <h3 className="techs__about_title">7 технологий</h3>
        <p className="techs__about_description">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className="techs__list">
          {technologies.map((tech, index) => (
            <li key={index} className="techs__list_item">
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Techs;
