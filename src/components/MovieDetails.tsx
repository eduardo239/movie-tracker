import { Segment } from "semantic-ui-react";
import { IMovieDetails } from "../abstract/interfaces";

const MovieDetails = ({ movie }: { movie: IMovieDetails | null }) => {
  if (movie)
    return (
      <div>
        <h1>
          {movie.title} ({movie.release_date.split("-")[0]}){" "}
        </h1>
        <p>{movie.overview}</p>
      </div>
    );
  else return null;
};

export default MovieDetails;
