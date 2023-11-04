import { ITvDetails } from "../abstract/interfaces";

const apiPosterUrl = import.meta.env.VITE_TMDB_POSTER_URL;

const TvPoster = ({ data }: { data: ITvDetails }) => {
  return (
    <div className="flex flex-end">
      <img
        src={`${apiPosterUrl}${data.poster_path}`}
        alt={data.original_name}
        className="poster-md"
      />
    </div>
  );
};

export default TvPoster;
