import "./Promo.css";

const Promo = ({ aboutProjectRef, techRef, aboutMeRef, scrollToRef }) => {
  return (
    <section className="promo">
      <div className="promo__text">
        <h1 className="promo__title">
          Учебный проект студента факультета Веб-разработки.
        </h1>
      </div>
      <nav className="promo__links">
        <ul className="promo__list">
          <li>
            <button
              className="promo__link"
              onClick={() => scrollToRef(aboutProjectRef)}
            >
              О проекте
            </button>
          </li>
          <li>
            <button
              className="promo__link"
              onClick={() => scrollToRef(techRef)}
            >
              Технологии
            </button>
          </li>
          <li>
            <button
              className="promo__link"
              onClick={() => scrollToRef(aboutMeRef)}
            >
              Студент
            </button>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default Promo;
