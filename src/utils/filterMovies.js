// Вспомогательная функция для извлечения данных фильма
const extractMovieData = (movie) => (movie.data ? movie.data : movie);

// Функция для фильтрации фильмов по имени
const filterByName = (movie, searchTerm) => {
  const movieData = extractMovieData(movie);
  const nameRULower = (movieData.nameRU || '').toLowerCase();
  const nameENLower = (movieData.nameEN || '').toLowerCase();
  const searchTermLower = searchTerm.toLowerCase();

  return (
    nameRULower.includes(searchTermLower) || nameENLower.includes(searchTermLower)
  );
};

// Функция для фильтрации короткометражных фильмов
const filterByShortDuration = (movie) => {
  const movieData = extractMovieData(movie);
  const duration = movieData.duration;

  return duration && duration <= 40;
};

// Главная функция фильтрации
export const filterMovies = (movies, searchTerm = '', filterShort = false) => {
  const searchTermTrimmed = searchTerm.trim().toLowerCase();
  const filteredMovies = movies.filter((movie) =>
    filterByName(movie, searchTermTrimmed)
  );

  return filterShort ? filteredMovies.filter(filterByShortDuration) : filteredMovies;
};
