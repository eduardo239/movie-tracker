import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IMovieTrailers, ITvDetails } from "../abstract/interfaces";
import { fetchData, fetchTrailers } from "../fetch/tmdb";
import TvCast from "../components/TvCast";
import TvRating from "../components/TvRating";
import MovieOptions from "../components/MovieOptions";
import MovieTrailer from "../components/MovieTrailer";
import TvPoster from "../components/TvPoster";
import useFetch from "../hooks/useFetch";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const apiToken = import.meta.env.VITE_TMDB_API_TOKEN;
const tmdbBaseUrl = import.meta.env.VITE_TMDB_BASE_URL;

const TvPage = () => {
  const [id, _] = useSearchParams();
  const [trailers, setTrailers] = useState<IMovieTrailers | null>(null);
  const [tvDetails, setTvDetails] = useState<ITvDetails | null>(null);

  //https://api.themoviedb.org/3/tv/872585?api_key=3f795a6880aa28de37fe82409587654f

  const { data, loading, error } = useFetch<ITvDetails | null>(
    `${tmdbBaseUrl}/tv/${id.get("id")}?api_key=${apiKey}&language=pt-BR`
  );

  useEffect(() => {
    (async () => {
      const f = await fetchTrailers("tv", id.get("id"));
      setTrailers(f.data);
    })();
  }, [id]);

  if (!data) {
    return <div>Loading...</div>;
  }
  console.log(data);
  if (data)
    return (
      <section className="movie-details-container">
        <div className="movie-details-poster">
          <TvPoster data={data} />

          <TvCast data={data} />

          <TvRating data={data} />
        </div>
        {/* center */}
        <div className="movie-details-trailer">
          <MovieTrailer trailerKey={trailers?.results[0]?.key} />
          {/* <MovieTrailer trailerKey={trailers?.results[1]?.key} />
        <MovieTrailer trailerKey={trailers?.results[3]?.key} /> */}

          <div className="p-md">
            {/* {id.get("id") && <MovieOptions data={tvDetails} />} */}

            <h3>
              {data.original_name} ({data.first_air_date.split("-")[0]}){" "}
            </h3>
            <p>{data.overview}</p>
          </div>
        </div>
      </section>
    );
  else return null;
};

export default TvPage;
