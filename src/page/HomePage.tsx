import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { IMovieDetails } from "../abstract/interfaces";

const HomePage = () => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  const [movies, setMovies] = useState<IMovieDetails[] | null>(null);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const apiUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${page}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setMovies(data.results))
      .catch((error) => console.error(error));
  }, [apiKey, page]);

  return (
    <div>
      <section className="flex flex-center">
        {movies &&
          movies.map((movie) => (
            <Link key={movie.id} to={`/movies?id=${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="poster-md"
              />
            </Link>
          ))}
      </section>

      <center>
        <button onClick={() => setPage(page - 1)}>Anterior</button>
        {` | `}
        <button onClick={() => setPage(page + 1)}>Próxima</button>
      </center>
    </div>
  );
};

export default HomePage;
