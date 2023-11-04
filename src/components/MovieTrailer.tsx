import Trailer from "./Trailer";

const MovieTrailer = ({
  trailerKey,
  hidden,
}: {
  trailerKey?: string;
  hidden: boolean;
}) => {
  return (
    <div className={`${hidden ? "hidden" : ""}`}>
      {trailerKey && <Trailer trailerKey={trailerKey} />}
    </div>
  );
};

export default MovieTrailer;
