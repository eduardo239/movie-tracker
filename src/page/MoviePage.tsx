import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IMovieDetails, IMovieTrailers } from "../abstract/interfaces";
import { fetchData, fetchTrailers } from "../fetch/tmdb";
import MovieOptions from "../components/MovieOptions";

import MoviePoster from "../components/MoviePoster";
import MovieCast from "../components/MovieCast";
import MovieRating from "../components/MovieRating";
import MovieTrailer from "../components/MovieTrailer";
import useFetch from "../hooks/useFetch";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const apiToken = import.meta.env.VITE_TMDB_API_TOKEN;
const tmdbBaseUrl = import.meta.env.VITE_TMDB_BASE_URL;

const MoviePage = () => {
  const [id, _] = useSearchParams();
  const [trailers, setTrailers] = useState<IMovieTrailers | null>(null);
  const [movieDetails, setMovieDetails] = useState<IMovieDetails | null>(null);

  //https://api.themoviedb.org/3/movie/872585?api_key=3f795a6880aa28de37fe82409587654f

  const { data, loading, error } = useFetch<IMovieDetails | null>(
    `${tmdbBaseUrl}/movie/${id.get("id")}?api_key=${apiKey}&language=pt-BR`
  );
  console.log(loading, error);

  useEffect(() => {
    (async () => {
      const f = await fetchTrailers("movie", id.get("id"));
      setTrailers(f.data);
    })();
  }, [id]);

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

  if (data)
    return (
      <section className="movie-details-container">
        <div className="movie-details-poster">
          <MoviePoster data={data} />

          <MovieCast data={data} />

          <MovieRating data={data} />
        </div>
        {/* center */}
        <div className="movie-details-trailer">
          <MovieTrailer trailerKey={trailers?.results[0]?.key} />
          {/* <MovieTrailer trailerKey={trailers?.results[1]?.key} />
        <MovieTrailer trailerKey={trailers?.results[3]?.key} /> */}

          <div className="p-md">
            {id.get("id") && <MovieOptions movie={data} />}

            <h3>
              {data.title} ({data.release_date.split("-")[0]}){" "}
            </h3>
            <p>{data.overview}</p>
          </div>
        </div>
      </section>
    );
  else return null;
};

export default MoviePage;
