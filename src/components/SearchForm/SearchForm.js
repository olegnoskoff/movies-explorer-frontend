import React, { useEffect, useState } from "react";
import "./SearchForm.css";

const SearchForm = ({
  handleFilterMovies,
  moviesTumbler,
  moviesInputSearch,
  handleGetMoviesTumbler,
  saveToLocalStorage,
}) => {
  const [inputSearch, setInputSearch] = useState(moviesInputSearch || "");
  const [tumbler, setTumbler] = useState(moviesTumbler || false);

  const handleInputChange = (evt) => {
    const newInputSearch = evt.target.value;
    setInputSearch(newInputSearch);
    if (saveToLocalStorage) {
      localStorage.setItem("moviesInputSearch", newInputSearch);
    }
  };

  const handleCheckboxChange = () => {
    const newTumbler = !tumbler;
    setTumbler(newTumbler);
    handleFilterMovies(inputSearch, newTumbler);
    handleGetMoviesTumbler(newTumbler);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleFilterMovies(inputSearch, tumbler);
  };

  useEffect(() => {
    setTumbler(moviesTumbler || false);
    setInputSearch(moviesInputSearch || "");
  }, [moviesTumbler, moviesInputSearch]);

  return (
    <form className="search" onSubmit={handleSubmit}>
      <div className="search__wrapper">
        <div className="search__area">
          <input
            className="search__input"
            type="text"
            placeholder="Фильм"
            value={inputSearch}
            onChange={handleInputChange}
          />
          <button className="search__button" type="submit"></button>
        </div>
        <div className="search__handle">
          <label className="search__checkbox">
            <input
              className="search__switch"
              type="checkbox"
              checked={tumbler}
              onChange={handleCheckboxChange}
            />
            <span className="search__indicator"></span>
          </label>
          <p className="search__handle-text">Короткометражки</p>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
