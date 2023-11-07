import { Link, useLocation, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { IMovieDetails, IMovieResults } from "../abstract/interfaces";
import { getSearch } from "../fetch/tmdb";
import useFetch from "../hooks/useFetch";
import { useMovie } from "../context/MovieContext";
import { Dimmer, Loader, Message, Segment } from "semantic-ui-react";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

const HomePage = () => {
  const { mediaType, setMediaType } = useMovie();

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Get the 'page' query parameter
  const pageQuery = queryParams.get("page");
  const pageMediaType = queryParams.get("media");

  const [searchResults, setSearchResults] = useState<IMovieDetails[] | null>(
    null
  );
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState("");

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
    if (pageQuery) setPage(parseInt(pageQuery));
  }, [pageQuery]);

  if (loading)
    return (
      <Segment>
        <Dimmer active>
          <Loader />
        </Dimmer>
      </Segment>
    );

  if (error)
    return (
      <Segment>
        <Message negative>
          <Message.Header>Error</Message.Header>
          <p>{error.message}</p>
        </Message>
      </Segment>
    );

  return (
    <div>
      <Segment>
        <h3>{mediaType}</h3>
        <form onSubmit={(e) => onSearchSubmit(e)}>
          <input
            type="text"
            placeholder="Search... (Press enter to search)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>

        <div>
          <button onClick={() => onMediaChange("tv")}>TV</button>
          <button onClick={() => onMediaChange("movie")}>MOVIE</button>
        </div>
      </Segment>

      <section>
        <button disabled={page === 1} onClick={() => onPageChange(page - 1)}>
          Anterior
        </button>
        <button onClick={() => onPageChange(page + 1)}>Próxima</button>
      </section>

      {searchResults ? (
        <section>
          {searchResults &&
            searchResults.map((item) => (
              <Link key={item.id} to={`/${mediaType}?id=${item.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.title}
                />
              </Link>
            ))}
        </section>
      ) : (
        <section>
          {data?.results &&
            data.results.map((item) => (
              <Link key={item.id} to={`/${mediaType}?id=${item.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.title}
                />
              </Link>
            ))}
        </section>
      )}

      <section>
        <button disabled={page === 1} onClick={() => onPageChange(page - 1)}>
          Anterior
        </button>
        <button onClick={() => onPageChange(page + 1)}>Próxima</button>
      </section>
    </div>
  );
};

export default HomePage;
