import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import moviesApi from "../../utils/MoviesApi";
import * as mainApi from "../../utils/MainApi";
import { filterMovies } from "../../utils/filterMovies";
import { useScreenResize } from "../../hooks/screenHooks";
import { formatMovieData } from "../../utils/movieDataUtils";

const Movies = ({ openPopup }) => {
  const [loading, setLoading] = useState(false);
  const [allMovies, setAllMovies] = useState([]);
  const [moviesRemains, setMoviesRemains] = useState([]);
  const [moviesInputSearch, setMoviesInputSearch] = useState("");
  const [moviesTumbler, setMoviesTumbler] = useState(false);
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const [additionalMoviesCount, setAdditionalMoviesCount] = useState(0);
  const [moviesSaved, setMoviesSaved] = useState([]);
  const [emptySearch, setEmptySearch] = useState(false);
  const navigate = useNavigate();
  
  useScreenResize(setAdditionalMoviesCount);

  useEffect(() => {
    const fetchSavedAndAllMovies = () => {
      setLoading(true);

      if (localStorage.getItem("movies")) {
        const cachedMovies = JSON.parse(localStorage.getItem("movies"));

        mainApi
          .getMovies()
          .then((savedMoviesResponse) => {
            const { data: savedMoviesData } = savedMoviesResponse;
            let savedMovies = [];
            if (Array.isArray(savedMoviesData)) {
              savedMovies = savedMoviesData;
            } else {
              console.error(
                "Неожиданный формат для сохраненных фильмов:",
                savedMoviesResponse
              );
            }
            setMoviesSaved(savedMovies);
            const enhancedMovies = cachedMovies.map((movie) => ({
              ...movie,
              isFavorited: savedMovies.some(
                (savedMovie) => savedMovie.movieId === movie.id
              ),
            }));
            setAllMovies(enhancedMovies);
          })
          .catch((err) => {
            console.error("Ошибка при загрузке сохраненных фильмов:", err);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        moviesApi
          .getMovies()
          .then((allMoviesData) => {
            mainApi
              .getMovies()
              .then((savedMoviesResponse) => {
                const { data: savedMoviesData } = savedMoviesResponse;
                let savedMovies = [];
                if (Array.isArray(savedMoviesData)) {
                  savedMovies = savedMoviesData;
                } else {
                  console.error(
                    "Неожиданный формат для сохраненных фильмов:",
                    savedMoviesResponse
                  );
                }
                setMoviesSaved(savedMovies);
                const enhancedMovies = allMoviesData.map((movie) => ({
                  ...movie,
                  isFavorited: savedMovies.some(
                    (savedMovie) => savedMovie.movieId === movie.id
                  ),
                }));
                setAllMovies(enhancedMovies);
                localStorage.setItem("movies", JSON.stringify(enhancedMovies));
              })
              .catch((err) => {
                openPopup(
                  "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
                );
              })
              .finally(() => {
                setLoading(false);
              });
          })
          .catch((err) => {
            openPopup(
              "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
            );
          });
      }
    };

    fetchSavedAndAllMovies();
  }, [openPopup]);

  const handleFilterMovies = useCallback(
    (inputSearch, tumbler) => {
      setMoviesInputSearch(inputSearch);
      if (inputSearch.trim() === "") {
        setEmptySearch(true);
        return;
      }
      setEmptySearch(false);
      const filteredMovies = filterMovies(allMovies, inputSearch, tumbler);
      setDisplayedMovies(filteredMovies.slice(0, additionalMoviesCount * 4));

      const remains = filteredMovies.slice(additionalMoviesCount * 4);
      setMoviesRemains(remains);
    },
    [allMovies, additionalMoviesCount]
  );

  const handleGetMoviesTumbler = (newTumblerValue) => {
    setMoviesTumbler(newTumblerValue);
    localStorage.setItem("moviesTumbler", JSON.stringify(newTumblerValue));
  };

  useEffect(() => {
    if (allMovies && allMovies.length > 0) {
      const localMoviesInputSearch = localStorage.getItem("moviesInputSearch");

      if (localMoviesInputSearch) {
        setMoviesInputSearch(localMoviesInputSearch);
        const filteredMovies = filterMovies(
          allMovies,
          localMoviesInputSearch,
          moviesTumbler
        );
        setDisplayedMovies(filteredMovies.slice(0, additionalMoviesCount * 4));

        const remains = filteredMovies.slice(additionalMoviesCount * 4);
        setMoviesRemains(remains);
      }

      const localMoviesTumbler = JSON.parse(
        localStorage.getItem("moviesTumbler")
      );

      if (localMoviesTumbler !== null) {
        setMoviesTumbler(localMoviesTumbler);
      }
    }
  }, [allMovies, moviesTumbler, additionalMoviesCount]);

  const getLocalMovieId = (movie) => movie.movieId || movie.id;

  const toggleFavoriteStatus = (movie) => {
    let updatedMovie;
    if (movie.isFavorited) {
      deleteMovieFromFavorites(movie)
        .then(() => {
          updatedMovie = { ...movie, isFavorited: false };
          updateLocalMovies(updatedMovie);
        })
        .catch((err) => {
          handleToggleError(err);
        });
    } else {
      addMovieToFavorites(movie)
        .then((updatedMovie) => {
          updateLocalMovies(updatedMovie);
        })
        .catch((err) => {
          handleToggleError(err);
        });
    }
  };

  const deleteMovieFromFavorites = (movie) => {
    return mainApi.deleteMovie(movie._id);
  };

  const addMovieToFavorites = (movie) => {
    const formattedMovie = formatMovieData(movie);
    return mainApi.createMovie(formattedMovie).then((savedMovieResponse) => {
      const savedMovieData = savedMovieResponse.data;
      const updatedMovie = {
        ...movie,
        isFavorited: true,
        _id: savedMovieData._id,
      };
      return updatedMovie;
    });
  };

  const updateLocalMovies = (updatedMovie) => {
    const localMovieId = getLocalMovieId(updatedMovie);
    const updatedMovies = allMovies.map((m) =>
      getLocalMovieId(m) === localMovieId ? updatedMovie : m
    );
    setAllMovies(updatedMovies);
    localStorage.setItem("movies", JSON.stringify(updatedMovies));
  };

  const handleToggleError = (err) => {
    console.error("Ошибка при обработке фильма", err);
    navigate(
      `/error?message=${encodeURIComponent(
        err.message || "Ошибка при обработке фильма"
      )}`
    );
  };

  const handleMoreButtonClick = () => {
    const newDisplayedMovies = [
      ...displayedMovies,
      ...moviesRemains.slice(0, additionalMoviesCount),
    ];
    setDisplayedMovies(newDisplayedMovies);

    const remains = moviesRemains.slice(additionalMoviesCount);
    setMoviesRemains(remains);
  };

  return (
    <>
      <SearchForm
        handleFilterMovies={handleFilterMovies}
        moviesTumbler={moviesTumbler}
        handleGetMoviesTumbler={handleGetMoviesTumbler}
        moviesInputSearch={moviesInputSearch}
        saveToLocalStorage={true}
      />
      {emptySearch && (
        <p className="movies__empty">Нужно ввести ключевое слово</p>
      )}
      {loading ? (
        <Preloader />
      ) : (
        <>
          {displayedMovies.length === 0 &&
            moviesInputSearch !== "" &&
            !emptySearch && <p className="movies__empty">Ничего не найдено</p>}
          <MoviesCardList
            movies={displayedMovies}
            moviesRemains={moviesRemains}
            moviesSaved={moviesSaved}
            handleMore={handleMoreButtonClick}
            isButtonVisible={moviesRemains.length > 0}
            toggleFavoriteStatus={toggleFavoriteStatus}
          />
        </>
      )}
    </>
  );
};

export default Movies;
