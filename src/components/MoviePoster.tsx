import { IMovieDetails, ITvDetails } from "../abstract/interfaces";

const apiPosterUrl = import.meta.env.VITE_TMDB_POSTER_URL;

const MoviePoster = ({ data }: { data: IMovieDetails | null }) => {
  if (data)
    return (
      <div>
        <img src={`${apiPosterUrl}${data.poster_path}`} alt={data.title} />
      </div>
    );
};

export default MoviePoster;
