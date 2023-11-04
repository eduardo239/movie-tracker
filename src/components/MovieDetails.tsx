import { IMovieDetails } from "../abstract/interfaces";

const MovieDetails = ({ movie }: { movie: IMovieDetails | null }) => {
  if (movie)
    return (
      <section>
        <h3>
          {movie.title} ({movie.release_date.split("-")[0]}){" "}
        </h3>
        <p>{movie.overview}</p>
      </section>
    );
  else return null;
};

export default MovieDetails;
