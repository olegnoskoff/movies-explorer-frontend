const baseURL = "https://api.movies100.nomoreparties.co";

const makeRequest = async (method, endpoint, body = null) => {
  const requestOptions = {
    method,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: body ? JSON.stringify(body) : null,
  };

  const response = await fetch(`${baseURL}${endpoint}`, requestOptions);
  return checkResponse(response);
};

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err) => Promise.reject(err));
};

const register = (email, password, name) =>
  makeRequest("POST", "/signup", { email, password, name });

const login = (email, password) =>
  makeRequest("POST", "/signin", { email, password });

const getUser = () => makeRequest("GET", "/users/me");

const updateUser = (email, name) =>
  makeRequest("PATCH", "/users/me", { email, name });

const getMovies = () => makeRequest("GET", "/movies");

const createMovie = (movieData) => makeRequest("POST", "/movies", movieData);

const deleteMovie = (movieId) => makeRequest("DELETE", `/movies/${movieId}`);

const signout = () => makeRequest("GET", "/signout");

export {
  register,
  login,
  getUser,
  updateUser,
  getMovies,
  createMovie,
  deleteMovie,
  signout,
};
