import { Header, Label, Segment } from "semantic-ui-react";
import { IMovieDetails } from "../abstract/interfaces";

const MovieDetails = ({ movie }: { movie: IMovieDetails | null }) => {
  console.log(movie);
  if (movie)
    return (
      <Segment basic>
        <Header as="h1">
          {movie.title} ({movie.release_date.split("-")[0]}){" "}
        </Header>
        <p>{movie.overview}</p>
      </Segment>
    );
  else return null;
};

export default MovieDetails;
