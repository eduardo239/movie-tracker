import { Image } from "semantic-ui-react";
import { IMovieDetails } from "../abstract/interfaces";

const apiPosterUrl = import.meta.env.VITE_TMDB_POSTER_URL;

const MoviePoster = ({ data }: { data: IMovieDetails | null }) => {
  if (data)
    return (
      <Image
        src={`${apiPosterUrl}${data.poster_path}`}
        verticalAlign="middle"
        size="small"
      />
    );
};

export default MoviePoster;
