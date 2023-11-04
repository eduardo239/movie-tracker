import { useEffect, useState } from "react";
import { ICast, ICredits, IMovieDetails } from "../abstract/interfaces";
import { fetchCast } from "../fetch/tmdb";

const MovieCast = ({ data }: { data: IMovieDetails }) => {
  // https://api.themoviedb.org/3/movie/565770?language=en-US

  const [credits, setCredits] = useState<ICredits | null>(null);

  useEffect(() => {
    (async () => {
      const f = await fetchCast("movie", data.id + "");
      setCredits(f.data);
    })();
  }, [data]);

  return (
    <div className="p-md">
      <div className="bg-3">
        <p>Release Date: {data.release_date}</p>
        <p>Status: {data.status}</p>
      </div>

      <h4>Cast</h4>
      {credits && (
        <>
          <p>{credits.cast.length > 0 && credits.cast[0].name}</p>
          <p>{credits.cast.length > 1 && credits.cast[1].name}</p>
          <p>{credits.cast.length > 2 && credits.cast[2].name}</p>
          <p>{credits.cast.length > 3 && credits.cast[3].name}</p>
        </>
      )}
    </div>
  );
};

export default MovieCast;
