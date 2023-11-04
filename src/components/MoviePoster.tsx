import { IMovieDetails, ITvDetails } from "../abstract/interfaces";

const apiPosterUrl = import.meta.env.VITE_TMDB_POSTER_URL;

const MoviePoster = ({ data }: { data: IMovieDetails }) => {
  return (
    <div className="flex flex-end">
      <img
        src={`${apiPosterUrl}${data.poster_path}`}
        alt={data.title}
        className="poster-md"
      />
    </div>
  );
};

export default MoviePoster;
