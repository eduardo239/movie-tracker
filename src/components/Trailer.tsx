const Trailer = ({
  trailerKey,
}: {
  trailerKey: string;
}): React.JSX.Element | null => {
  if (trailerKey)
    return (
      <iframe
        title="movie-trailer"
        src={`https://www.youtube.com/embed/${trailerKey}`}
        allowFullScreen
      />
    );
  else return null;
};

export default Trailer;
