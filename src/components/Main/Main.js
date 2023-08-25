import React, { useRef } from "react";
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";

const Main = () => {
  const aboutProjectRef = useRef(null);
  const techRef = useRef(null);
  const aboutMeRef = useRef(null);

  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

  return (
    <>
      {/* Промо-раздел с кнопками для скроллинга */}
      <Promo
        aboutProjectRef={aboutProjectRef}
        techRef={techRef}
        aboutMeRef={aboutMeRef}
        scrollToRef={scrollToRef}
      />

      {/* Раздел "О проекте" */}
      <section ref={aboutProjectRef}>
        <AboutProject />
      </section>

      {/* Раздел "Технологии" */}
      <section ref={techRef}>
        <Techs />
      </section>

      {/* Раздел "Обо мне" */}
      <section ref={aboutMeRef}>
        <AboutMe />
      </section>

      {/* Раздел "Портфолио" */}
      <Portfolio />
    </>
  );
};

export default Main;
