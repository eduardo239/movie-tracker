import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IMovieTrailers, ITvDetails } from "../abstract/interfaces";
import { fetchData, fetchTrailers } from "../fetch/tmdb";
import TvCast from "../components/TvCast";
import TvRating from "../components/TvRating";
import MovieOptions from "../components/MovieOptions";
import MovieTrailer from "../components/MovieTrailer";
import TvPoster from "../components/TvPoster";

const TvPage = () => {
  const [id, _] = useSearchParams();
  const [trailers, setTrailers] = useState<IMovieTrailers | null>(null);
  const [tvDetails, setTvDetails] = useState<ITvDetails | null>(null);

  useEffect(() => {
    (async () => {
      const f = await fetchData("tv", id.get("id"));
      setTvDetails(f.data);
    })();
  }, [id]);

  useEffect(() => {
    (async () => {
      const f = await fetchTrailers("tv", id.get("id"));
      setTrailers(f.data);
    })();
  }, [id]);

  if (!tvDetails) {
    return <div>Loading...</div>;
  }
  console.log(tvDetails);
  return (
    <section className="movie-details-container">
      <div className="movie-details-poster">
        <TvPoster data={tvDetails} />

        <TvCast data={tvDetails} />

        <TvRating data={tvDetails} />
      </div>
      {/* center */}
      <div className="movie-details-trailer">
        <MovieTrailer trailerKey={trailers?.results[0]?.key} />
        {/* <MovieTrailer trailerKey={trailers?.results[1]?.key} />
        <MovieTrailer trailerKey={trailers?.results[3]?.key} /> */}

        <div className="p-md">
          {/* {id.get("id") && <MovieOptions data={tvDetails} />} */}

          <h3>
            {tvDetails.original_name} ({tvDetails.first_air_date.split("-")[0]}){" "}
          </h3>
          <p>{tvDetails.overview}</p>
        </div>
      </div>
    </section>
  );
};

export default TvPage;
