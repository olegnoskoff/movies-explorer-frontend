import React from "react";
import "./AboutProject.css";

const Stage = ({ title, description }) => {
  return (
    <div className="about-project__stages">
      <h3 className="about-project__stage-title">{title}</h3>
      <p className="about-project__stage-description">{description}</p>
    </div>
  );
};

const TimeBar = ({ text, title, className }) => {
  return (
    <div className={className}>
      <div className={`${className}-text`}>{text}</div>
      <p className="about-project__timebar-title">{title}</p>
    </div>
  );
};

const AboutProject = () => {
  return (
    <section className="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__content">
        <Stage
          title="Дипломный проект включал 5 этапов"
          description="Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки."
        />
        <Stage
          title="На выполнение диплома ушло 5 недель"
          description="У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься."
        />
      </div>
      <div className="about-project__timebar">
        <TimeBar
          text="1 неделя"
          title="Back-end"
          className="about-project__timebar-backend"
        />
        <TimeBar
          text="4 недели"
          title="Front-end"
          className="about-project__timebar-frontend"
        />
      </div>
    </section>
  );
};

export default AboutProject;
