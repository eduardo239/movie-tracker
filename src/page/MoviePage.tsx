import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MovieDetails, MovieTrailers } from "../abstract/interfaces";
import { fetchData, fetchTrailers } from "../fetch/tmdb";
import Trailer from "../components/Trailer";
import MovieOptions from "../components/MovieOptions";
import { useMovie } from "../context/MovieContext";
import { useAuth } from "../context/AuthContext";

const MoviePage = () => {
  const { getTracker } = useMovie();
  const { user } = useAuth();

  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const apiPosterUrl = import.meta.env.VITE_TMDB_POSTER_URL;

  const [id, _] = useSearchParams();
  const [trailers, setTrailers] = useState<MovieTrailers | null>(null);
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);

  useEffect(() => {
    (async () => {
      const _id = id.get("id");
      if (user && _id) {
        getTracker(_id, user.uid);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, id]);

  useEffect(() => {
    (async () => {
      const f = await fetchData("movie", id.get("id"));
      setMovieDetails(f.data);
    })();
  }, [apiKey, id]);

  useEffect(() => {
    (async () => {
      const f = await fetchTrailers("movie", id.get("id"));
      setTrailers(f.data);
    })();
  }, [apiKey, id]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <section className="movie-details-container">
        <div className="movie-details-poster">
          <div className="flex flex-end">
            <img
              src={`${apiPosterUrl}${movieDetails.poster_path}`}
              alt={movieDetails.title}
              className="poster-md"
            />
          </div>

          <div className="p-md">
            <p>Release Date: {movieDetails.release_date}</p>
            <p>Status: {movieDetails.status}</p>
          </div>

          <div className="flex flex-end p-md">
            <div className="center p-sm">
              <small>Rating</small>
              <span className="rounded-element">
                {movieDetails.vote_average.toFixed(2)}
              </span>
            </div>
            <div className="center p-sm">
              <small>Runtime</small>
              <span className="rounded-element">{movieDetails.runtime}</span>
            </div>
          </div>
        </div>
        {/* center */}
        <div className="movie-details-trailer">
          {trailers && trailers.results.length > 0 && (
            <Trailer trailerKey={trailers.results[0].key} />
          )}

          <div className="p-md">
            {id.get("id") && (
              <MovieOptions movie={movieDetails} id={id.get("id") + ""} />
            )}

            <h3>
              {movieDetails.title} ({movieDetails.release_date.split("-")[0]}){" "}
            </h3>
            <p>{movieDetails.overview}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MoviePage;
