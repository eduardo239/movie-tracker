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
import MovieDetails from "../components/MovieDetails";
import LoadingInfo from "../components/LoadingInfo";
import MessageInfo from "../components/Message";
import { Segment } from "semantic-ui-react";

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

  if (loading) return <LoadingInfo />;

  if (error) return <MessageInfo message={error.message} />;

  if (data)
    return (
      <Segment textAlign="center">
        <MovieTrailer
          hidden={false}
          trailerKey={trailers?.results[trailers?.results.length - 1]?.key}
        />
        <MoviePoster data={data} />
        <MovieDetails movie={data} />
        <MovieOptions movie={data} />
        <MovieRating data={data} />
        <MovieCast data={data} />
      </Segment>
    );
  else return null;
};

export default MoviePage;
