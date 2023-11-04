import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IMovieDetails, IMovieTrailers } from "../abstract/interfaces";
import { fetchData, fetchTrailers } from "../fetch/tmdb";
import MovieOptions from "../components/MovieOptions";

import MoviePoster from "../components/MoviePoster";
import MovieCast from "../components/MovieCast";
import MovieRating from "../components/MovieRating";
import MovieTrailer from "../components/MovieTrailer";

const MoviePage = () => {
  const [id, _] = useSearchParams();
  const [trailers, setTrailers] = useState<IMovieTrailers | null>(null);
  const [movieDetails, setMovieDetails] = useState<IMovieDetails | null>(null);

  useEffect(() => {
    (async () => {
      const f = await fetchData("movie", id.get("id"));
      setMovieDetails(f.data);
    })();
  }, [id]);

  useEffect(() => {
    (async () => {
      const f = await fetchTrailers("movie", id.get("id"));
      setTrailers(f.data);
    })();
  }, [id]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <section className="movie-details-container">
      <div className="movie-details-poster">
        <MoviePoster data={movieDetails} />

        <MovieCast data={movieDetails} />

        <MovieRating data={movieDetails} />
      </div>
      {/* center */}
      <div className="movie-details-trailer">
        <MovieTrailer trailerKey={trailers?.results[0]?.key} />
        <MovieTrailer trailerKey={trailers?.results[1]?.key} />
        <MovieTrailer trailerKey={trailers?.results[3]?.key} />

        <div className="p-md">
          {id.get("id") && <MovieOptions movie={movieDetails} />}

          <h3>
            {movieDetails.title} ({movieDetails.release_date.split("-")[0]}){" "}
          </h3>
          <p>{movieDetails.overview}</p>
        </div>
      </div>
    </section>
  );
};

export default MoviePage;
