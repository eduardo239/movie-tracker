import { Link, useLocation, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { IMovieDetails, IMovieResults } from "../abstract/interfaces";
import { fetchDataPopular } from "../fetch/tmdb";
import useFetch from "../hooks/useFetch";

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
  const [mediaType, setMediaType] = useState<"movie" | "tv">("movie");

  const { data, loading, error } = useFetch<IMovieResults | null>(
    `https://api.themoviedb.org/3/${mediaType}/popular?api_key=${apiKey}&language=en-US&page=${page}`
  );
  console.log(data, loading, error);

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
    if (error) {
      console.error("Error:", error);
    }
  }, [error]);

  useEffect(() => {
    // (async () => {
    //   const data = await fetchDataPopular(mediaType, page);
    //   if (data) setMovies(data);
    // })();

    // const apiUrl = `https://api.themoviedb.org/3/${mediaType}/popular?api_key=${apiKey}&language=en-US&page=${page}`;

    // fetch(apiUrl)
    //   .then((response) => response.json())
    //   .then((data) => setMovies(data.results))
    //   .catch((error) => console.error(error));

    navigate(`/all?p=${page}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiKey, page, query, mediaType]);

  if (loading)
    return (
      <section className="p-md">
        <div className="loading-spinner "></div>
      </section>
    );

  return (
    <div>
      <section className="search-container">
        <h3>{mediaType}</h3>
        <form onSubmit={(e) => onSearchSubmit(e)}>
          <input
            className="search"
            type="text"
            placeholder="Search... (Press enter to search)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>

        <div className="flex flex-center gap">
          <button onClick={() => setMediaType("tv")}>TV</button>
          <button onClick={() => setMediaType("movie")}>MOVIE</button>
        </div>
      </section>

      <section className="flex flex-center">
        {data?.results &&
          data.results.map((item) => (
            <Link key={item.id} to={`/${mediaType}?id=${item.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title}
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
