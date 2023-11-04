import { Link, useLocation, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { IMovieDetails } from "../abstract/interfaces";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Get the 'page' query parameter
  const query = queryParams.get("p");

  const [movies, setMovies] = useState<IMovieDetails[] | null>(null);
  const [page, setPage] = useState<number>(
    query ? parseInt(query ? query : "1") : 1
  );
  const [search, setSearch] = useState("");
  const [mediaType, setMediaType] = useState<"movie" | "tv">("tv");

  const onSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!search) {
      return;
    }

    const apiUrl = `https://api.themoviedb.org/3/search/${mediaType}?query=${search}&api_key=${apiKey}&include_adult=false&language=en-US&page=1`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setMovies(data.results))
      .catch((error) => console.error(error));

    setPage(1);
    navigate(`/search?p=${page}`);
  };

  useEffect(() => {
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setMovies(data.results))
      .catch((error) => console.error(error));

    navigate(`/all?p=${page}`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiKey, page, query]);

  return (
    <div>
      <section className="search-container">
        <form onSubmit={(e) => onSearchSubmit(e)}>
          <input
            className="search"
            type="text"
            placeholder="Search... (Press enter to search)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </section>

      <section className="flex flex-center">
        {movies &&
          movies.map((movie) => (
            <Link key={movie.id} to={`/${mediaType}?id=${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="poster-md"
              />
            </Link>
          ))}
      </section>

      <section className="flex gap flex-center">
        <button className="btn btn-secondary" onClick={() => setPage(page - 1)}>
          Anterior
        </button>
        <button className="btn btn-secondary" onClick={() => setPage(page + 1)}>
          Próxima
        </button>
      </section>
    </div>
  );
};

export default HomePage;
