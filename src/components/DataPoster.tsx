const tmdbPosterUrl = import.meta.env.VITE_TMDB_POSTER_URL;
const fbPosterDefault = import.meta.env.VITE_FIREBASE_POSTER_DEFAULT_URL;

type TDataPoster = { data: { poster_path: string | null } };

const DataPoster = ({ data }: TDataPoster) => {
  if (data && data.poster_path)
    return (
      <img src={`${tmdbPosterUrl}${data.poster_path}`} className="poster-lg" />
    );
  else return <img src={fbPosterDefault} className="poster-lg" />;
};

export default DataPoster;
