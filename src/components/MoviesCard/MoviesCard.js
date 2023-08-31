import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import MoviePictures from "../../images/movie-pic-test.png";
import "./MoviesCard.css";

function MoviesCard({ movie }) {
  const { pathname } = useLocation();
  const [favorite, setFavorite] = useState(false);

  const handleClick = () => {
    setFavorite(!favorite);
  };

  const renderButton = () => {
    if (pathname === "/saved-movies") {
      return <button type="button" className="card__btn card__delete-btn" />;
    }
    const buttonClassName = `card__btn card__btn${
      favorite ? "_active" : "_inactive"
    }`;
    return (
      <button type="button" className={buttonClassName} onClick={handleClick} />
    );
  };

  return (
    <li className="card">
      <a
        className="card__image-content"
        href="/saved-movies"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className="card__image"
          src={MoviePictures}
          alt={`Постер к видео ${movie.title}`}
        />
      </a>
      <div className="card__element">
        <h2 className="card__title">{movie.title}</h2>
        <div className="card__buttons">{renderButton()}</div>
      </div>
      <p className="card__duration">{movie.duration}</p>
    </li>
  );
}

MoviesCard.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default MoviesCard;
