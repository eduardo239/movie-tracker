const tmdbPosterUrl = import.meta.env.VITE_TMDB_POSTER_URL;
const fbPosterDefault = import.meta.env.VITE_FIREBASE_POSTER_DEFAULT_URL2;

type TDataPoster = {
  data: {
    poster_path: string | null;
    original_title?: string;
    name?: string;
  };
};

const DataPoster = ({ data }: TDataPoster) => {
  if (data && data.poster_path)
    return (
      <img src={`${tmdbPosterUrl}${data.poster_path}`} className="poster-lg" />
    );
  else
    return (
      <div className="relative">
        <p className="poster-title__absolute">
          {data.original_title ? data.original_title : data.name}
        </p>
        <img src={fbPosterDefault} className="poster-lg" />
      </div>
    );
};

export default DataPoster;
