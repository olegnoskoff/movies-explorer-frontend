import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (

    <footer className="footer">
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className="footer__bottom">
      <p className="footer__copyright">&copy; {currentYear}</p>
        <ul className="footer__links-list">
          <li>
            <a className="footer__link" href="https://practicum.yandex.ru/" target="_blank" rel="noopener noreferrer">Яндекс.Практикум</a>
          </li>
          <li>
            <a className="footer__link" href="https://github.com/olegnoskoff" target="_blank" rel="noopener noreferrer">Github</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
export default Footer;