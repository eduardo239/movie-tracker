import { Image } from "semantic-ui-react";

const DataPoster = ({ data }: { data: { poster_path: string | null } }) => {
  const tmdbPosterUrl = import.meta.env.VITE_TMDB_POSTER_URL;
  const fbPosterDefault = import.meta.env.VITE_FIREBASE_POSTER_DEFAULT_URL;

  if (data && data.poster_path)
    return (
      <Image
        src={`${tmdbPosterUrl}${data.poster_path}`}
        verticalAlign="middle"
      />
    );
  else return <Image src={fbPosterDefault} verticalAlign="middle" />;
};

export default DataPoster;
