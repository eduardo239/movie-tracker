import { Image } from "semantic-ui-react";
import { ITvDetails } from "../abstract/interfaces";

const apiPosterUrl = import.meta.env.VITE_TMDB_POSTER_URL;

const TvPoster = ({ data }: { data: ITvDetails }) => {
  return (
    <Image
      src={`${apiPosterUrl}${data.poster_path}`}
      verticalAlign="middle"
      size="small"
    />
  );
};

export default TvPoster;
