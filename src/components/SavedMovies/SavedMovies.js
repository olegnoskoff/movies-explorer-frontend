import React, { useState, useEffect, useCallback } from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import {
  getMovies as getSavedMovies,
  deleteMovie as deleteSavedMovie,
} from "../../utils/MainApi";
import { filterMovies } from "../../utils/filterMovies";

const SavedMovies = ({ openPopup }) => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [errorText, setErrorText] = useState("");
  const [moviesTumbler, setMoviesTumbler] = useState(false);
  const [moviesInputSearch, setMoviesInputSearch] = useState("");

  const fetchData = useCallback(() => {
    setLoading(true);
    getSavedMovies()
      .then((response) => response.data)
      .then((allMovies) => {
        setMovies(allMovies);
        setFilteredMovies(allMovies);
      })
      .catch((err) => {
        setErrorText("Ошибка при получении сохранённых фильмов");
        openPopup("Ошибка при получении сохранённых фильмов");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [openPopup]);

  // Загрузка сохраненных фильмов при инициализации компонента
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Обработчик фильтрации
  const handleGetMovies = (inputSearch = "", tumbler = false) => {
    setMoviesTumbler(tumbler);
    setMoviesInputSearch(inputSearch);

    if (inputSearch.trim() === "") {
      const filtered = filterMovies(movies, "", tumbler);
      setFilteredMovies(filtered);
    } else {
      const filtered = filterMovies(movies, inputSearch, tumbler);
      setFilteredMovies(filtered);
    }
  };

  // Обработчик переключателя "короткометражек"
  const handleGetMoviesTumbler = (tumbler) => {
    setMoviesTumbler(tumbler);
    handleGetMovies(moviesInputSearch, tumbler);
  };

  // Обработчик удаления фильма
  const handleDeleteMovie = (movieId) => {
    deleteSavedMovie(movieId)
      .then(() => {
        setMovies((prevMovies) => {
          const updated = prevMovies.filter((movie) => movie._id !== movieId);
          setFilteredMovies(filterMovies(updated, moviesInputSearch, moviesTumbler));
          return updated;
        });
      })
      .catch((err) => {
        setErrorText("Ошибка при удалении фильма");
        openPopup("Ошибка при удалении фильма");
      });
  };

  return (
    <section className="savedmovies">
      <SearchForm
        handleFilterMovies={handleGetMovies}
        handleGetMoviesTumbler={handleGetMoviesTumbler}
        moviesTumbler={moviesTumbler}
        moviesInputSearch={moviesInputSearch}
      />
      {loading && <Preloader />}
      {errorText && <div className="savedmovies__text-err">{errorText}</div>}
      {!loading && !errorText && filteredMovies.length > 0 && (
        <MoviesCardList
          movies={filteredMovies}
          isSavedMovies={true}
          toggleFavoriteStatus={handleDeleteMovie}
          moviesSaved={filteredMovies}
        />
      )}
      {!loading && !errorText && filteredMovies.length === 0 && (
        <p className="savedmovies__text-popup">Ничего не найдено</p>
      )}
    </section>
  );
};

export default SavedMovies;