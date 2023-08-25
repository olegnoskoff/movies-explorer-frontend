import "./MoviesCardList.css";
import React, { useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

const movies = [
  { id: 1, title: "Моё любимое кино", duration: "1ч56м" },
  { id: 2, title: "Моё любимое кино", duration: "1ч56м" },
  { id: 3, title: "Моё любимое кино", duration: "1ч56м" },
  { id: 4, title: "Моё любимое кино", duration: "1ч56м" },
  { id: 5, title: "Моё любимое кино", duration: "1ч56м" },
  { id: 6, title: "Моё любимое кино", duration: "1ч56м" },
  { id: 7, title: "Моё любимое кино", duration: "1ч56м" },
  { id: 8, title: "Моё любимое кино", duration: "1ч56м" },
  { id: 9, title: "Моё любимое кино", duration: "1ч56м" },
  { id: 10, title: "Моё любимое кино", duration: "1ч56м" },
  { id: 11, title: "Моё любимое кино", duration: "1ч56м" },
  { id: 12, title: "Моё любимое кино", duration: "1ч56м" },
];

const MoviesCardList = () => {
  const [visibleMovies, setVisibleMovies] = useState(5);

  const loadMoreMovies = () => {
    setVisibleMovies((prevVisibleMovies) => prevVisibleMovies + 5);
  };

  const visibleMovieItems = movies
    .slice(0, visibleMovies)
    .map((movie) => <MoviesCard key={movie.id} movie={movie} />);

  const showLoadMoreButton = visibleMovies < movies.length;

  return (
    <section className="card-list">
      <ul className="card-list__items">{visibleMovieItems}</ul>
      {showLoadMoreButton && (
        <div className="card-list__button-container">
          <button
            className="card-list__button-more"
            onClick={loadMoreMovies}
          >
            Ещё
          </button>
        </div>
      )}
    </section>
  );
};

export default MoviesCardList;
