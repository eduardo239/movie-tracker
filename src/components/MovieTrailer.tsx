import Trailer from "./Trailer";

const MovieTrailer = ({ trailerKey }: { trailerKey?: string }) => {
  return <div>{trailerKey && <Trailer trailerKey={trailerKey} />}</div>;
};

export default MovieTrailer;
