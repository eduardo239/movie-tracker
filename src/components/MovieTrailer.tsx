const MovieTrailer = ({
  trailerKey,
}: {
  trailerKey?: string;
  hidden: boolean;
}) => {
  return (
    <div className="trailer">
      <iframe
        title="movie-trailer"
        src={`https://www.youtube.com/embed/${trailerKey}`}
        allowFullScreen
      />
    </div>
  );
};

export default MovieTrailer;
