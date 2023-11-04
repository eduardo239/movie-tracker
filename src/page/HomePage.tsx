import { Link, useLocation, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { IMovieDetails, IMovieResults } from "../abstract/interfaces";
import { getSearch } from "../fetch/tmdb";
import useFetch from "../hooks/useFetch";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Get the 'page' query parameter
  const pageQuery = queryParams.get("page");
  const pageMediaType = queryParams.get("media");
  console.log(pageMediaType);
  console.log(pageQuery);

  const [searchResults, setSearchResults] = useState<IMovieDetails[] | null>(
    null
  );
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState("");
  const [mediaType, setMediaType] = useState<"movie" | "tv">("movie");

  const { data, loading, error } = useFetch<IMovieResults | null>(
    `https://api.themoviedb.org/3/${mediaType}/popular?api_key=${apiKey}&language=en-US&page=${page}`
  );

  const onSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!search) {
      setSearchResults(null);
      navigate(`/all?media=${mediaType}&page=${page}`);
      return;
    }

    const data = await getSearch(mediaType, search, page);
    setSearchResults(data);
    setPage(1);
    navigate(`/search?page=${page}`);
  };

  const onPageChange = async (_page: number) => {
    if (searchResults) {
      setPage(_page);
      navigate(`/search?page=${_page}`);

      const data = await getSearch(mediaType, search, page);
      setSearchResults(data);
    } else {
      setPage(_page);
      navigate(`/all?media=${mediaType}&page=${_page}`);
    }
  };

  const onMediaChange = (_media: "movie" | "tv") => {
    setMediaType(_media);
    navigate(`/all?media=${mediaType}&page=${page}`);
  };

  useEffect(() => {
    if (error) {
      console.error("Error:", error);
    }
  }, [error]);

  useEffect(() => {
    // on home click, fetch default
  }, []);

  if (loading)
    return (
      <section className="p-md">
        <div className="loading-spinner "></div>
      </section>
    );

  if (error)
    return (
      <section className="p-md">
        <div className="error-container">{error.message}</div>
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
          <button
            className="btn btn-primary"
            onClick={() => onMediaChange("tv")}
          >
            TV
          </button>
          <button
            className="btn btn-primary"
            onClick={() => onMediaChange("movie")}
          >
            MOVIE
          </button>
        </div>
      </section>

      <section className="flex gap flex-center">
        <button
          className="btn btn-secondary"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
        >
          Anterior
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => onPageChange(page + 1)}
        >
          Próxima
        </button>
      </section>

      {searchResults ? (
        <section className="flex flex-center">
          {searchResults &&
            searchResults.map((item) => (
              <Link key={item.id} to={`/${mediaType}?id=${item.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.title}
                  className="poster-md"
                />
              </Link>
            ))}
        </section>
      ) : (
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
      )}

      <section className="flex gap flex-center">
        <button
          className="btn btn-secondary"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
        >
          Anterior
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => onPageChange(page + 1)}
        >
          Próxima
        </button>
      </section>
    </div>
  );
};

export default HomePage;
